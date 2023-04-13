import styled from 'styled-components';

export const Content = styled.div`
	.container {
		margin-top: 30px;

		.top-inline-flex {
			display: flex;

			.left-side {
				margin-right: 60px;
				
				p {
					text-align: justify;
				}
			}

			.right-side {
				flex: 1;
			}
		}

		h4 {
			margin-top: 20px;
		}

		.gallery-content {
			height: fit-content;
		}

		@media (max-width: 760px) {
			.top-inline-flex {
				flex-direction: column;

				.left-side {
					margin-right: 0;
				}
			}
			
		}
	}


`;