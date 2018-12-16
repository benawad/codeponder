import styled from "styled-components"

const DEFAULT_SIZE = 3

export const Spinner = styled("div")<{ size?: number; speed?: number }>`
  border: ${p => p.size || DEFAULT_SIZE}px solid
    ${p => p.theme.colors.neutrals[3]};
  border-top: ${p => p.size}px solid ${p => p.theme.colors.primary[1]};
  border-radius: 50%;
  width: ${p => (p.size || DEFAULT_SIZE) * 7.5}px;
  height: ${p => (p.size || DEFAULT_SIZE) * 7.5}px;
  animation: spin ${p => p.speed || 1}s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
