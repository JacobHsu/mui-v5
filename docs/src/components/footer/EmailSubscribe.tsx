import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme, styled, alpha } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputBase, { inputBaseClasses } from '@mui/material/InputBase';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const NEWSLETTER_SUBSCRIBE_URL =
  process.env.DEPLOY_ENV === 'production' || process.env.DEPLOY_ENV === 'staging'
    ? 'https://f0433e60.sibforms.com/serve/MUIEAHEhgYhMvLAw0tycwk1BQaIB-q0akob3JdtDBmHLhSR-jLheJ2T44LFCz27alz9wq_Nkdz9EK7Y8hzM1vQND9kTFyKkkhTIbEzXaH5d-_S9Fw4PXS1zAK8efPY6nhCdoAop1SKTeZ_GAPW5S0xBFQRLUGYbvvRgE4Q2Ki_f1KjbiCqaRuzmj_I3SD1r0CoR4INmK3CLtF4kF'
    : 'https://f0433e60.sibforms.com/serve/MUIEAE9LexIU5u5hYkoDJ-Mc379-irLHNIlGEgCm5njkAwg6OYFfNQTd25n4SO6vJom9WvQ89GJ0sYBzFYswLRewcOvD_dRtoFycXIObP8SMm-kNO1CdXKaWEZutrfqMKygHb1Je1QBGrMUnJg8J5qVeCwa7rSPBN0A1_6Ug3SiGjgIlbiCcMVA4KbhaYTiBvKkaejlCjgZcLHBT';

const Form = styled('form')({});

function searchParams(params: any) {
  return Object.keys(params)
    .filter((key) => params[key] != null)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
}

export default function EmailSubscribe({ sx }: { sx?: SxProps<Theme> }) {
  const [form, setForm] = React.useState<{
    email: string;
    status: 'initial' | 'loading' | 'failure' | 'sent';
  }>({
    email: '',
    status: 'initial',
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setForm((current) => ({ ...current, status: 'loading' }));
    try {
      await fetch(NEWSLETTER_SUBSCRIBE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        mode: 'no-cors',
        body: searchParams({
          EMAIL: form.email,
          email_address_check: '',
          locale: 'en',
        }),
      });
      setForm((current) => ({ ...current, status: 'sent' }));
    } catch (error) {
      setForm((current) => ({ ...current, status: 'failure' }));
    }
  };
  if (form.status === 'sent') {
    return (
      <Alert
        severity="success"
        sx={[
          (theme) => ({
            maxWidth: { sm: 400 },
            bgcolor: 'success.50',
            ...theme.applyDarkStyles({
              bgcolor: 'primaryDark.700',
            }),
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        iconMapping={{
          success: (
            <CheckCircleRoundedIcon
              fontSize="small"
              sx={(theme: Theme) => ({
                color: 'success.700',
                ...theme.applyDarkStyles({
                  color: 'success.600',
                }),
              })}
            />
          ),
        }}
      >
        <AlertTitle sx={{ typography: 'body2', fontWeight: 700 }}>
          Thanks for subscribing!
        </AlertTitle>
        Go to your email and open the <strong>confirmation email</strong> to confirm your
        subscription.
      </Alert>
    );
  }
  return (
    <Form onSubmit={handleSubmit} sx={sx}>
      <FormLabel
        htmlFor="email-subscribe"
        sx={{ typography: 'caption', color: 'text.secondary', fontWeight: 'medium' }}
      >
        Your email
      </FormLabel>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          mt: 1,
          gap: 1.5,
          width: { xs: '100%', sm: 'auto' },
          maxWidth: { xs: '100%', sm: 320 },
        }}
      >
        <InputBase
          id="email-subscribe"
          name="email"
          type="email"
          placeholder="example@email.com"
          value={form.email}
          onChange={(event) => setForm({ email: event.target.value, status: 'initial' })}
          inputProps={{ required: true }}
          sx={[
            (theme) => ({
              minWidth: 220,
              borderRadius: 1,
              border: '1px solid',
              bgcolor: '#fff',
              boxShadow: `inset 0 1px 2px ${
                (theme.vars || theme).palette.grey[50]
              }, 0 1px 0.5px ${alpha(theme.palette.grey[100], 0.6)}`,
              borderColor: 'grey.200',
              typography: 'body2',
              '&:hover': {
                borderColor: 'grey.300',
                boxShadow: `inset 0 1px 2px ${(theme.vars || theme).palette.grey[50]}, 0 1px 2px ${
                  (theme.vars || theme).palette.grey[100]
                }`,
              },
              [`&.${inputBaseClasses.focused}`]: {
                boxShadow: `0 0 0 3px ${(theme.vars || theme).palette.primary[200]}`,
                borderColor: 'primary.300',
              },
              [`& .${inputBaseClasses.input}`]: {
                borderRadius: `calc(${theme.shape.borderRadius}px - 1px)`,
                py: 1,
                px: 1.5,
              },
            }),
            (theme) =>
              theme.applyDarkStyles({
                bgcolor: 'primaryDark.800',
                boxShadow: `inset 0 1px 1px ${
                  (theme.vars || theme).palette.primaryDark[900]
                }, 0 1px 0.5px ${(theme.vars || theme).palette.common.black}`,
                borderColor: 'primaryDark.600',
                '&:hover': {
                  borderColor: 'primaryDark.400',
                  boxShadow: `inset 0 1px 1px ${
                    (theme.vars || theme).palette.primaryDark[900]
                  }, 0 1px 2px ${(theme.vars || theme).palette.common.black}`,
                },
                [`&.${inputBaseClasses.focused}`]: {
                  boxShadow: `0 0 0 3px ${(theme.vars || theme).palette.primary[800]}`,
                  borderColor: 'primary.600',
                },
              }),
          ]}
        />
        <Button variant="outlined" disabled={form.status === 'loading'} type="submit">
          Subscribe
        </Button>
      </Box>
      {form.status === 'failure' && (
        <FormHelperText
          sx={(theme) => ({
            color: 'warning.800',
            ...theme.applyDarkStyles({
              color: 'warning.500',
            }),
          })}
        >
          Oops! Something went wrong, please try again later.
        </FormHelperText>
      )}
    </Form>
  );
}
