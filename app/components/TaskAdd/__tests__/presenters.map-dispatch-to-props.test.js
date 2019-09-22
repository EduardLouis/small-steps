/* eslint-env jest */

import { mapDispatchToProps } from 'ss/components/TaskAdd/presenters'
import formsActions from 'ss/models/forms/actions'
import tasksThunks from 'ss/models/tasks/thunks'

jest.mock('ss/models/tasks/thunks', () => (
  {
    createTask: jest.fn(() => 'some-thunked-action-0')
  }
))

describe('TaskAdd mapDispatchToProps', () => {
  let dispatch

  beforeEach(() => {
    dispatch = jest.fn()
  })

  describe('tasksSubmit', () => {
    it('should dispatch correct actions in correct order', () => {
      const text = 'some-text'
      const parent = 'some-parent-id'
      const { tasksSubmit } = mapDispatchToProps(dispatch)

      tasksSubmit(text, parent)

      expect(dispatch.mock.calls[0][0]).toEqual(
        tasksThunks.createTask(text, parent)
      )
      expect(dispatch.mock.calls[1][0]).toEqual(
        formsActions.formsDeactivate('task-add')
      )
      expect(dispatch.mock.calls[2][0]).toEqual(
        formsActions.formsActivate('goal-add')
      )
    })
  })
})