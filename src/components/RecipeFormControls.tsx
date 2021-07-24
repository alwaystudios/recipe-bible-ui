import { Button } from '@alwaystudios/as-ui-components'
import styled from '@emotion/styled'
import React from 'react'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;
`

type Props = {
  onDelete: () => void
  onPublish: () => void
  onFocus: () => void
  onView: () => void
  published: boolean
  focused: boolean
}

export const RecipeFormControls: React.FC<Props> = ({
  onView,
  onDelete,
  onPublish,
  onFocus,
  published,
  focused,
}) => (
  <Container>
    <div>
      <Button text="view" onClick={onView} />
      <Button text={published ? 'unpublish' : 'publish'} onClick={onPublish} disabled={focused} />
      {published && <Button text={focused ? 'unfocus' : 'focus'} onClick={onFocus} />}
    </div>
    <Button
      text="delete"
      onClick={() => {
        if (confirm('delete this recipe?')) {
          onDelete()
        }
      }}
    />
  </Container>
)
