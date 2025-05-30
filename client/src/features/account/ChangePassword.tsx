import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Paper, Typography } from "@mui/material";
import TextInput from "../../app/layout/shared/components/TextInput";
import { z } from "zod";
import { useAccount } from "../../lib/hooks/useAccount";

const schema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6)
});

export default function ChangePasswordForm() {
  const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm<ChangePasswordData>({
    resolver: zodResolver(schema),
    mode: 'onTouched'
  });
  const {changePassword} = useAccount();

  return (
    <Paper component="form" onSubmit={handleSubmit(data => changePassword.mutate(data))} sx={{ p: 3, maxWidth: 500, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5">Change Password</Typography>
      <TextInput name="currentPassword" label="Current Password" type="password" control={control} />
      <TextInput name="newPassword" label="New Password" type="password" control={control} />
      <Button type="submit" variant="contained" disabled={!isValid || isSubmitting}>Submit</Button>
    </Paper>
  );
}