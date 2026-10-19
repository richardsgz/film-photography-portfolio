import { readdirSync, readFileSync } from 'node:fs';
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

function localSeriesImages(directory: string, altPrefix: string): SeriesImage[] {
	const relativeDirectory = directory.replace(/^\/+/, '');
	const directoryPath = resolve(process.cwd(), 'public', relativeDirectory);
	const files = readdirSync(directoryPath, { withFileTypes: true })
		.filter((entry) => entry.isFile() && /\.(jpe?g|png|webp)$/i.test(entry.name) && !/^cover\./i.test(entry.name))
		.map((entry) => entry.name)
		.sort((first, second) => first.localeCompare(second, undefined, { numeric: true }));

	return files.map((file, index) =>
		localImage(`/${relativeDirectory}/${file}`, `${altPrefix} photograph ${index + 1}`),
	);
}

const spanishSeriesImages = localSeriesImages('/images/siete-dias-de-sol', 'Siete dias de sol');

const localSeriesCover = localImage(
	'/images/siete-dias-de-sol/cover.JPG',
	'Siete dias de sol cover photograph',
);

const scotlandSeriesImages = localSeriesImages('/images/edinburgh-arran-bute', 'Summer in Edinburgh/Arran/Bute');
const scotlandSeriesCover = localImage(
	'/images/edinburgh-arran-bute/cover.JPG',
	'Summer in Edinburgh/Arran/Bute cover photograph',
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
		images: spanishSeriesImages,
	},
	{
		slug: 'summer-in-edinburgh-arran-bute',
		number: '02',
		title: 'Summer in Edinburgh/Arran/Bute',
		meta: 'Scotland · 2026',
		description: 'A summer journey through Edinburgh, Arran, and Bute.',
		film: 'Canon Sure Shot Telemax · Fujifilm Superia X-Tra 400 (expired 2024)',
		cover: scotlandSeriesCover,
		images: scotlandSeriesImages,
	},
];
