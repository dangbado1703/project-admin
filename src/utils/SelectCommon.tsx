import { Select, SelectProps } from 'antd'
import React from 'react'
import { filterSelectOption } from './filterOptions'

const SelectCommon = ({ ...rest }: SelectProps) => {
    return (
        <div>
            <Select
                showArrow={false}
                {...rest}
                allowClear
                showSearch
                filterOption={filterSelectOption}
                className='custom-select'
            />
        </div>
    )
}

export default SelectCommon