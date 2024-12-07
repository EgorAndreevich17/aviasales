import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
// import './SideBar.scss'

export default function Sidebar() {
  const onChange: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

    return (
        <div className='sidebar-menu'>
            <h3>Количество пеересадок</h3>
            <Checkbox onChange={onChange}>Все</Checkbox>
            <Checkbox onChange={onChange}>Без пересадок</Checkbox>
            <Checkbox onChange={onChange}>1 пересадка</Checkbox>
            <Checkbox onChange={onChange}>2 пересадки</Checkbox>
            <Checkbox onChange={onChange}>3 пересадки</Checkbox>
        </div>
    );
}
