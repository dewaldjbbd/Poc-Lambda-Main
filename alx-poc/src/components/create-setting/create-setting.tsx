import { Grid, TextField, Button } from '@mui/material';
import React, { FC } from 'react';
import PatchSettingsResponse from '../../api-services/settings/patch/PatchSettingsResponse';
import PostSettings from '../../api-services/settings/post/PostSettings';
import { PostSettingsRequestBody } from '../../api-services/settings/post/PostSettingsRequest';

interface CreateSettingProps {
  onCreate: any
}

const CreateSetting: FC<CreateSettingProps> = ({ onCreate }) => {
  let setting: PostSettingsRequestBody = {
    key: undefined,
    name: undefined,
    value: undefined,
    version: undefined,
  }
  const padded = {
    padding: "20px"
  };

  const createSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      name: { value: string };
      key: { value: string };
      value: { value: string };
    };
    setting.name = target.name.value
    setting.key = target.key.value
    setting.value = target.value.value
    setting.version = "0"
    PostSettings(setting)
      .then((response: PatchSettingsResponse) => {
        onCreate()
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <>
      <form onSubmit={createSettings}>
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
              InputProps={{ disableUnderline: true}}
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
              InputProps={{ disableUnderline: true}}
              defaultValue={setting.key}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="value-input"
              name="value"
              fullWidth
              label="Value"
              multiline
              minRows={4}
              maxRows={10}
              type="text"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              InputProps={{ disableUnderline: true}}
              defaultValue={setting.value}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type='submit'>Submit</Button>
          </Grid>
        </Grid >
      </form>
    </>
  )
};

export default CreateSetting;
