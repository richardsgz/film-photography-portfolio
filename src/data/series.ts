export type SeriesImage = {
	image: string;
	alt: string;
};

export type Series = {
	slug: string;
	number: string;
	title: string;
	meta: string;
	description: string;
	film: string;
	cover: string;
	images: SeriesImage[];
};

const localSeriesImages = Array.from({ length: 7 }, (_, index) => ({
	image: `/film-photography-portfolio/images/siete-dias-de-sol/${String(index + 1).padStart(2, '0')}.JPG`,
	alt: `Siete dias de sol photograph ${index + 1}`,
}));

export const series: Series[] = [
	{
		slug: 'siete-dias-de-sol',
		number: '01',
		title: 'Siete dias de sol',
		meta: 'Spain · 2026',
		description: 'Seven days of sun, held in small gestures and long afternoons.',
		film: '35mm · Kodak Gold 200',
		cover: '/film-photography-portfolio/images/siete-dias-de-sol/cover.JPG',
		images: localSeriesImages,
	},
	{
		slug: 'the-long-afternoon',
		number: '02',
		title: 'The long afternoon',
		meta: 'Lisbon · 2023',
		description: 'A placeholder edit for a future series about heat, shade, and the hours between plans.',
		film: '35mm · Series to come',
		cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=85',
		images: [
			{
				image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=85',
				alt: 'Mountain landscape under a deep blue evening sky',
			},
			{
				image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85',
				alt: 'Misty green hills beneath a pale sky',
			},
			{
				image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=85',
				alt: 'A quiet road winding through a golden landscape',
			},
		],
	},
	{
		slug: 'quiet-distances',
		number: '03',
		title: 'Quiet distances',
		meta: 'Scotland · 2022',
		description: 'A placeholder edit for a future series about walking, weather, and the edge of the map.',
		film: '35mm · Series to come',
		cover: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1600&q=85',
		images: [
			{
				image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1600&q=85',
				alt: 'Sunlight passing through a quiet forest',
			},
			{
				image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=85',
				alt: 'A quiet road winding through a golden landscape',
			},
			{
				image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=85',
				alt: 'Mountain landscape under a deep blue evening sky',
			},
		],
	},
];
