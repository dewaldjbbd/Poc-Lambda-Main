import React, { FC, forwardRef, useEffect, useState } from 'react';
import GetSettings from '../../api-services/settings/get/GetSettings'
import GetSettingsResponse, { GetSettingsResponseBody } from '../../api-services/settings/get/GetSettingsResponse'
import DeleteSettings from '../../api-services/settings/delete/DeleteSettings'
import DeleteSettingsResponse from '../../api-services/settings/delete/DeleteSettingsResponse'
import MaterialTable from "material-table";
import { ThemeProvider, createTheme, Paper, styled } from '@mui/material';
import { AddBox, ArrowUpward, Check, ChevronLeft, ChevronRight, Clear, Delete, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn } from '@mui/icons-material';
import UpdateSetting from '../update-setting/update-setting';
import CreateSetting from '../create-setting/create-setting';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

interface SettingTableProps { }

const SettingTable: FC<SettingTableProps> = () => {

  const tableIcons = {
    Add: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ViewColumn {...props} ref={ref} />)
  };

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    top: 100,
    zIndex: 100,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#008026' : '#008026',
    },
  }));

  useEffect(() => {
    getSettings();
  }, []);

  const [settings, setSettings] = useState<GetSettingsResponse>();
  const defaultMaterialTheme = createTheme();

  const getSettings = () => {
    GetSettings()
      .then((response: GetSettingsResponse) => {
        setSettings(response)
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteSettings = async (rowData: GetSettingsResponseBody) => {
    if (settings && settings.response) {
      let newSettings: GetSettingsResponse = {
        isException: false
      }
      newSettings.response = settings.response.filter(item => item.id !== rowData.id);
      setSettings(newSettings)
    }
    DeleteSettings(rowData.id)
      .then((response: DeleteSettingsResponse) => {
      })
      .catch((e: Error) => {
        getSettings()
      });
  }

  const updateSettings = (rowData: GetSettingsResponseBody) => {
    if (settings && settings.response) {
      let newSettings: GetSettingsResponse = {
        isException: false
      }
      let settingsAr = settings.response
      settings.response.forEach(function (item, i) { if (item.id === rowData.id) settingsAr[i] = rowData; });
      newSettings.response = settingsAr;
      setSettings(newSettings)
    }
  };

  const columns = [
    { title: "Name", field: "name" },
    { title: "Key", field: "key" },
    { title: "Value", field: "value" },
    { title: "Version", field: "version" },
  ];

  return (
    <>
      <Paper className='container'>
        <CreateSetting onCreate={getSettings}></CreateSetting>
      </Paper>
      <br />
      {settings && settings?.response &&
        (
          <Paper className='container'>
            <div>
              <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable
                  title="Settings"
                  options={{
                    actionsColumnIndex: -1
                  }}
                  components={{
                    Container: props => <Paper {...props} elevation={0} />
                  }}
                  columns={columns}
                  icons={tableIcons}
                  data={settings.response}
                  detailPanel={[
                    {
                      tooltip: 'Update Item',
                      render: rowData => {
                        return (
                          <UpdateSetting setting={rowData} onUpdate={updateSettings} onFail={getSettings}></UpdateSetting>
                        )
                      },
                    }
                  ]}
                  actions={[
                    {
                      icon: () => <Delete />,
                      tooltip: 'Delete Setting',
                      onClick: (event, rowData) => {
                        if (!Array.isArray(rowData))
                          deleteSettings(rowData)
                      }
                    }
                  ]}
                />
              </ThemeProvider>
            </div>
          </Paper>
        )}
      {!settings && (<BorderLinearProgress />)}
    </>
  );
}
export default SettingTable;
