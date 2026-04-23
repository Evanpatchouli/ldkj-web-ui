type CSSUnit = 'px' | 'rem' | 'em' | 'vh' | 'vw' | '%' | 'vmin' | 'vmax' | 'cm' | 'mm' | 'in' | 'pt' | 'pc';

export interface ConversionOptions {
  /**
   * 参考元素，用于相对单位转换（em, rem, % 等）
   */
  contextElement?: HTMLElement;
  /**
   * 视口宽度，用于 vw 单位转换
   */
  viewportWidth?: number;
  /**
   * 视口高度，用于 vh 单位转换
   */
  viewportHeight?: number;
  /**
   * 父元素尺寸，用于百分比转换
   */
  parentSize?: { width?: number; height?: number };
  /**
   * 字体大小基准，用于 rem 转换
   */
  fontSizeBase?: number;
}

class CSSUnitConverter {
  private static instance: CSSUnitConverter;

  private constructor() { }

  static getInstance(): CSSUnitConverter {
    if (!CSSUnitConverter.instance) {
      CSSUnitConverter.instance = new CSSUnitConverter();
    }
    return CSSUnitConverter.instance;
  }

  /**
   * 获取根元素字体大小（用于 rem 转换）
   */
  private getRootFontSize(): number {
    if (typeof document === 'undefined') return 16;
    const rootFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    return isNaN(rootFontSize) ? 16 : rootFontSize;
  }

  /**
   * 提取值和单位
   */
  private parseValue(value: string): { value: number; unit: CSSUnit | '' } {
    const match = value.match(/^(-?\d+(?:\.\d+)?)([a-z%]*)$/i);
    if (!match) {
      throw new Error(`Invalid CSS value: ${value}`);
    }

    const numValue = parseFloat(match[1]);
    const unit = (match[2].toLowerCase() as CSSUnit) || '';

    return { value: numValue, unit };
  }

  /**
   * 主转换方法
   */
  convertToPx(
    cssValue: string | number,
    options: ConversionOptions = {}
  ): number {
    // 处理数字输入
    if (typeof cssValue === 'number') {
      return cssValue;
    }

    const value = String(cssValue).trim();

    // 处理空值
    if (!value) return 0;

    // 处理像素值
    if (value.endsWith('px')) {
      return parseFloat(value);
    }

    // 解析值和单位
    const { value: numValue, unit } = this.parseValue(value);

    // 根据单位进行转换
    switch (unit) {
      case 'rem':
        return numValue * (options.fontSizeBase || this.getRootFontSize());

      case 'em':
        if (!options.contextElement) {
          throw new Error('contextElement is required for em unit conversion');
        }
        const parentFontSize = parseFloat(
          getComputedStyle(options.contextElement.parentElement || document.documentElement).fontSize
        );
        return numValue * parentFontSize;

      case '%':
        if (!options.parentSize) {
          throw new Error('parentSize is required for percentage conversion');
        }
        // 这里需要知道是宽度还是高度的百分比
        const parentWidth = options.parentSize.width || 100;
        return (numValue / 100) * parentWidth;

      case 'vw':
        const viewportWidth = options.viewportWidth ||
          (typeof window !== 'undefined' ? window.innerWidth : 1920);
        return (numValue / 100) * viewportWidth;

      case 'vh':
        const viewportHeight = options.viewportHeight ||
          (typeof window !== 'undefined' ? window.innerHeight : 1080);
        return (numValue / 100) * viewportHeight;

      case 'vmin':
        const vw = options.viewportWidth || window.innerWidth;
        const vh = options.viewportHeight || window.innerHeight;
        const vmin = Math.min(vw, vh);
        return (numValue / 100) * vmin;

      case 'vmax':
        const vw2 = options.viewportWidth || window.innerWidth;
        const vh2 = options.viewportHeight || window.innerHeight;
        const vmax = Math.max(vw2, vh2);
        return (numValue / 100) * vmax;

      case 'cm':
        return numValue * 37.795; // 1cm = 37.795px
      case 'mm':
        return numValue * 3.7795; // 1mm = 3.7795px
      case 'in':
        return numValue * 96; // 1inch = 96px
      case 'pt':
        return numValue * 1.3333; // 1pt = 1.3333px
      case 'pc':
        return numValue * 16; // 1pc = 16px

      case '':
        // 无单位，假设是像素
        return numValue;

      default:
        throw new Error(`Unsupported unit: ${unit}`);
    }
  }

  /**
   * 批量转换
   */
  convertMultipleToPx(
    values: Record<string, string | number>,
    options?: ConversionOptions
  ): Record<string, number> {
    const result: Record<string, number> = {};

    for (const [key, value] of Object.entries(values)) {
      try {
        result[key] = this.convertToPx(value, options);
      } catch (error) {
        console.warn(`Failed to convert ${key}: ${value}`, error);
        result[key] = typeof value === 'number' ? value : 0;
      }
    }

    return result;
  }
}

export default CSSUnitConverter;