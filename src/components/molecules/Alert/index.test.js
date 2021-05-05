import React from 'react'
import { wait, waitForElement } from '@testing-library/react-native'

import { renderWithContext } from 'services/tests/render'
import { COLORS } from 'services/style'
import { FEEDBACK } from 'services/constants'
import { alertStore } from 'services/stores/AlertStore'

import { Alert } from '.'
import { alertsTypes } from './styles'

const componentIds = {
  alertContainerId: 'alert-container',
}

describe('Alert', () => {
  it('renders correctly', () => {
    const { baseElement } = renderWithContext(<Alert />, alertStore)
    expect(baseElement).toMatchSnapshot()
  })

  it('should show alert with type danger', async () => {
    const message = 'Danger zone!'
    const { getByText, getByTestId } = renderWithContext(<Alert />, alertStore)

    alertStore.setAlert({
      message,
      type: FEEDBACK.DANGER,
    })
    await wait()

    const alertContainer = await waitForElement(() => getByTestId(componentIds.alertContainerId))
    const alertText = await waitForElement(() => getByText(message))

    expect(alertText.props.style).toContainEqual({ color: COLORS.DANGER })
    expect(alertContainer.props.style).toContainEqual(alertsTypes.danger)
  })

  it('should show alert with type success', async () => {
    const message = 'Success!'
    const { getByText, getByTestId } = renderWithContext(<Alert />, alertStore)

    alertStore.setAlert({
      message,
      type: FEEDBACK.SUCCESS,
    })
    await wait()

    const alertContainer = await waitForElement(() => getByTestId(componentIds.alertContainerId))
    const alertText = await waitForElement(() => getByText(message))

    expect(alertText.props.style).toContainEqual({ color: COLORS.SUCCESS })
    expect(alertContainer.props.style).toContainEqual(alertsTypes.success)
  })

  it('should show alert with type Warning', async () => {
    const message = 'Warning!'
    const { getByText, getByTestId } = renderWithContext(<Alert />, alertStore)

    alertStore.setAlert({
      message,
      type: FEEDBACK.WARNING,
    })
    await wait()

    const alertContainer = await waitForElement(() => getByTestId(componentIds.alertContainerId))
    const alertText = await waitForElement(() => getByText(message))

    expect(alertText.props.style).toContainEqual({ color: COLORS.WARNING })
    expect(alertContainer.props.style).toContainEqual(alertsTypes.warning)
  })

  it('should close alert', async () => {
    const message = 'Close me!'
    const { getByTestId } = renderWithContext(<Alert />, alertStore)

    alertStore.setAlert({
      message,
      type: FEEDBACK.WARNING,
    })
    await wait()

    const alertContainer = await waitForElement(() => getByTestId(componentIds.alertContainerId))

    await waitForElement(() => alertContainer)
    alertStore.closeAlert()

    expect(alertStore.isVisible).toBeFalsy()
  })
})
