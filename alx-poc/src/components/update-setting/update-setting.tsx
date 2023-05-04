import { FC } from 'react';
import { GetSettingsResponseBody } from '../../api-services/settings/get/GetSettingsResponse';
import { Grid, TextField, Button } from '@mui/material';
import PatchSettings from '../../api-services/settings/patch/PatchSettings';
import PatchSettingsResponse from '../../api-services/settings/patch/PatchSettingsResponse';

interface UpdateSettingProps {
  setting: GetSettingsResponseBody
  onUpdate: any
  onFail: any
}

const UpdateSetting: FC<UpdateSettingProps> = ({ setting, onUpdate, onFail }) => {
  const padded = {
    padding: "20px"
  };


  const updateSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      name: { value: string };
      key: { value: string };
      value: { value: string };
    };
    setting.name = target.name.value
    setting.key = target.key.value
    setting.value = target.value.value
    onUpdate(setting)
    PatchSettings(
      setting.id
      , setting
    )
      .then((response: PatchSettingsResponse) => {
      })
      .catch((e: Error) => {
        console.log(e);
        onFail()
      });
  };

  return (
    <form onSubmit={updateSettings}>
      <Grid container alignItems="center" spacing={2} columns={12} style={padded}>
        <Grid item xs={6}>
          <TextField
            id="name-input"
            name="name"
            label="Name"
            fullWidth
            type="text"
            variant="filled"
            InputLabelProps={{ shrink: true }}
            InputProps={{ disableUnderline: true }}
            defaultValue={setting.name}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="key-input"
            name="key"
            fullWidth
            label="Key"
            type="text"
            variant="filled"
            InputLabelProps={{ shrink: true }}
            InputProps={{ disableUnderline: true }}
            defaultValue={setting.key}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="value-input"
            name="value"
            fullWidth
            label="Value"
            type="text"
            multiline
            minRows={4}
            maxRows={10}
            variant="filled"
            InputLabelProps={{ shrink: true }}
            InputProps={{ disableUnderline: true }}
            defaultValue={setting.value}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type='submit'>Submit</Button>
        </Grid>
      </Grid >
    </form>
  )
};

export default UpdateSetting;
