import styled from 'styled-components';

export const Content = styled.div`
	.container {
		margin-top: 30px;

		.top-inline-flex {
			display: flex;

			.left-side {
				margin-right: 20px;
				
				p {
					text-align: justify;
				}
			}

			.right-side {
				flex: 1;
			}
		}
	}
`;