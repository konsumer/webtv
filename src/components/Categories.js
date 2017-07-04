import React from 'react'
import { connect } from 'react-redux'

import Dropdown from 'muicss/lib/react/dropdown'
import DropdownItem from 'muicss/lib/react/dropdown-item'

export const Categories = ({categories, category, onCategory}) => (
  <Dropdown color='primary' label={category || 'Category'}>
    {categories && categories.map(c => (<DropdownItem onClick={onCategory(c.category_name)} key={c.category_id}>{c.category_name}</DropdownItem>))}
  </Dropdown>
)

export default connect(state => state, dispatch => ({
  onCategory: value => () => dispatch({type: 'set', data: {field: 'category', value}})
}))(Categories)
