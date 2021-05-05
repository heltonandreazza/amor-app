import React from 'react'
import { render } from '@testing-library/react-native'

import { FEEDBACK } from 'services/constants'

import { getStyles } from './styles'
import Badge from '.'

const labels = {
  delivered: 'Entregue',
  canceled: 'Cancelado',
  issue: 'Problema',
}

describe('Badge', () => {
  it('renders correctly success', () => {
    const { getByText } = render(<Badge type={FEEDBACK.SUCCESS} label={labels.delivered} />)

    const styles = getStyles(FEEDBACK.SUCCESS)
    const badgeText = getByText(labels.delivered)
    const badge = badgeText.parentNode

    expect(badge.props.style).toContainEqual(styles.badge)
    expect(badgeText.props.style).toContainEqual(styles.badgeLabel)
  })

  it('renders correctly danger', () => {
    const { getByText } = render(<Badge type={FEEDBACK.DANGER} label={labels.canceled} />)

    const styles = getStyles(FEEDBACK.DANGER)
    const badgeText = getByText(labels.canceled)
    const badge = badgeText.parentNode

    expect(badge.props.style).toContainEqual(styles.badge)
    expect(badgeText.props.style).toContainEqual(styles.badgeLabel)
  })

  it('renders correctly warning', () => {
    const { getByText } = render(<Badge type={FEEDBACK.WARNING} label={labels.issue} />)

    const styles = getStyles(FEEDBACK.WARNING)
    const badgeText = getByText(labels.issue)
    const badge = badgeText.parentNode

    expect(badge.props.style).toContainEqual(styles.badge)
    expect(badgeText.props.style).toContainEqual(styles.badgeLabel)
  })
})
