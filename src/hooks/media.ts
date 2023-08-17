export type FormFactor = 'phone' | 'tablet' | 'desktop';

export const MEDIA_CONFIG: Record<FormFactor, [number, number]> = {
	phone: [0, 743],
	tablet: [744, 1133],
	desktop: [1134, Infinity],
};
