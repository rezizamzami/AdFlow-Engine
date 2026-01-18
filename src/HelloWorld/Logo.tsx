import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {z} from 'zod';
import {zColor} from '@remotion/zod-types';

export const myCompSchema2 = z.object({
	logoColor1: zColor(),
	logoColor2: zColor(),
});

export const Logo: React.FC<{
	logoColor1?: string;
	logoColor2?: string;
}> = ({logoColor1 = '#91EAE4', logoColor2 = '#86A8E7'}) => {
	const frame = useCurrentFrame();
	
	const opacity = interpolate(frame, [0, 20], [0, 1]);
	const scale = interpolate(frame, [0, 30], [0.5, 1], {
		extrapolateRight: 'clamp',
	});
	
	const container: React.CSSProperties = {
		opacity,
		transform: `scale(${scale})`,
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		// REVISI EKSTREM: Turunkan lagi ke 500
		marginTop: 500,    
		marginBottom: 20, // Jarak ke teks makin rapat biar satu kesatuan
	};

	return (
		<div style={container}>
			<svg
				width="300"
				height="300"
				viewBox="0 0 200 200"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<filter id="glow">
					<feGaussianBlur stdDeviation="4" result="coloredBlur"/>
					<feMerge>
						<feMergeNode in="coloredBlur"/>
						<feMergeNode in="SourceGraphic"/>
					</feMerge>
				</filter>

				<path
					d="M100 20 L160 180 H125 L100 110 L75 180 H40 L100 20 Z"
					fill="none"
					stroke={`url(#gradient)`}
					strokeWidth="8"
					strokeLinejoin="round"
					filter="url(#glow)"
				/>
				
				<path
					d="M80 140 H120"
					stroke="white"
					strokeWidth="6"
					strokeLinecap="round"
					opacity="0.9"
				/>

				<defs>
					<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor={logoColor1} />
						<stop offset="100%" stopColor={logoColor2} />
					</linearGradient>
				</defs>
			</svg>
		</div>
	);
};