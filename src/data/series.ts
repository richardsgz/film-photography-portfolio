import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { imageSize } from 'image-size';

const basePath = '/film-photography-portfolio';

export type SeriesImage = {
	image: string;
	alt: string;
	width: number;
	height: number;
	aspectRatio: number;
	orientation: 'landscape' | 'portrait' | 'square';
};

export type Series = {
	slug: string;
	number: string;
	title: string;
	meta: string;
	description: string;
	film: string;
	cover: SeriesImage;
	images: SeriesImage[];
};

export type JustifiedRow<T extends { aspectRatio: number }> = {
	items: T[];
	columns: string;
	startIndex: number;
};

export function getJustifiedRows<T extends { aspectRatio: number }>(
	items: T[],
	targetRowRatio = 2.4,
): JustifiedRow<T>[] {
	const rows: T[][] = [];
	let currentRow: T[] = [];
	let currentRatio = 0;

	items.forEach((item, index) => {
		currentRow.push(item);
		currentRatio += item.aspectRatio;

		if (currentRatio >= targetRowRatio && index < items.length - 1) {
			rows.push(currentRow);
			currentRow = [];
			currentRatio = 0;
		}
	});

	if (currentRow.length > 0) {
		rows.push(currentRow);
	}

	let startIndex = 0;
	return rows.map((row) => {
		const justifiedRow = {
			items: row,
			columns: row.map((item) => `${item.aspectRatio}fr`).join(' '),
			startIndex,
		};
		startIndex += row.length;
		return justifiedRow;
	});
}

function createImage(image: string, alt: string, width: number, height: number): SeriesImage {
	return {
		image,
		alt,
		width,
		height,
		aspectRatio: width / height,
		orientation: width === height ? 'square' : width > height ? 'landscape' : 'portrait',
	};
}

function localImage(publicPath: string, alt: string): SeriesImage {
	const relativePath = publicPath.replace(/^\/+/, '');
	const filePath = resolve(process.cwd(), 'public', relativePath);
	const { width = 1, height = 1 } = imageSize(readFileSync(filePath));
	return createImage(`${basePath}/${relativePath}`, alt, width, height);
}

function remoteImage(image: string, alt: string, width: number, height: number): SeriesImage {
	return createImage(image, alt, width, height);
}

const localSeriesImages = Array.from({ length: 7 }, (_, index) =>
	localImage(
		`/images/siete-dias-de-sol/${String(index + 1).padStart(2, '0')}.JPG`,
		`Siete dias de sol photograph ${index + 1}`,
	),
);

const localSeriesCover = localImage(
	'/images/siete-dias-de-sol/cover.JPG',
	'Siete dias de sol cover photograph',
);

const placeholderMountain = remoteImage(
	'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=85',
	'Mountain landscape under a deep blue evening sky',
	1200,
	801,
);

const placeholderHills = remoteImage(
	'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85',
	'Misty green hills beneath a pale sky',
	1600,
	1067,
);

const placeholderRoad = remoteImage(
	'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=85',
	'A quiet road winding through a golden landscape',
	1600,
	1067,
);

const placeholderForest = remoteImage(
	'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1600&q=85',
	'Sunlight passing through a quiet forest',
	1600,
	1104,
);

export const series: Series[] = [
	{
		slug: 'siete-dias-de-sol',
		number: '01',
		title: 'Siete días de sol',
		meta: 'Spain · 2026',
		description: 'Seven days of sun, held in small gestures and long afternoons.',
		film: 'Olympus AF-1 · Kodak ColorPlus 200 (expired 2020)',
		cover: localSeriesCover,
		images: localSeriesImages,
	},
	{
		slug: 'the-long-afternoon',
		number: '02',
		title: 'The long afternoon',
		meta: 'Lisbon · 2023',
		description: 'A placeholder edit for a future series about heat, shade, and the hours between plans.',
		film: '35mm · Series to come',
		cover: placeholderMountain,
		images: [
			placeholderMountain,
			placeholderHills,
			placeholderRoad,
		],
	},
	{
		slug: 'quiet-distances',
		number: '03',
		title: 'Quiet distances',
		meta: 'Scotland · 2022',
		description: 'A placeholder edit for a future series about walking, weather, and the edge of the map.',
		film: '35mm · Series to come',
		cover: placeholderForest,
		images: [
			placeholderForest,
			placeholderRoad,
			placeholderMountain,
		],
	},
];
