import styled, { keyframes } from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';

const overlayShow = keyframes({
	'0%': { opacity: 0 },
	'100%': { opacity: 0.5 },
});

export const FloatingButtonContainer = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	margin: 20px;
`;

export const Content = styled(Dialog.Content)`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: white;
	padding: 20px;
	border-radius: 10px;
	box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.15);
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 90;
`;

export const Overlay = styled(Dialog.Overlay)`
	z-index: 90;
	background: black;
	opacity: 0.5;
	position: fixed;
	inset: 0;
	animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;
