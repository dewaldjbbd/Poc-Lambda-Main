import { FC } from 'react';
import SettingTable from '../setting-table/setting-table';

interface SettingProps { }

const Setting: FC<SettingProps> = () => {

  const padded = {
    padding: "70px 0"
  };
  return (
    <>
      <div style={padded}>
        <SettingTable></SettingTable>
      </div>
    </>
  )
};

export default Setting;
