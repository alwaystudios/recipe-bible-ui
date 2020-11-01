import styled from 'styled-components'
import { mediumScreen } from '../../config'

export const TextWithIcon = styled.div`
  padding: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;

  > p {
    margin-left: 1rem;
  }

  > span {
    background-color: #3db505;
    border-radius: 50%;
    padding: 0.5rem;
  }

  img {
    width: 30px;
  }

  @media only screen and (max-width: ${mediumScreen}px) {
    img {
      width: 20px;
    }
  }
`
