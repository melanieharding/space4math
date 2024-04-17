'use server'
import axios, { AxiosError } from 'axios'
import { Auth, google } from 'googleapis'

const recaptchaValidation = async (token: string) => {
  const result = await (async () => {
    try {
      const response = await axios({
        url: 'https://www.google.com/recaptcha/api/siteverify',
        method: 'POST',
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token,
        },
      })
      return { successful: true, message: Number(response.data.score) }
    } catch (err: unknown) {
      const error = err as AxiosError
      let message
      if (error.response) {
        message = `reCAPTCHA server responded with non 2xx code: ${error.response.data}`
      } else if (error.request) {
        message = `No reCAPTCHA response received: ${error.request}`
      } else {
        message = `Error setting up reCAPTCHA response: ${error.message}`
      }
      return { successful: false, message }
    }
  })()
  return result
}

async function gsrun(client: Auth.JWT, data: (FormDataEntryValue | null)[][]) {
  const gsapi = google.sheets({ version: 'v4', auth: client })
  const request = {
    spreadsheetId: '16KQnM8wFldBHZNR8KoWHZ-pvPXFSpBuphj7GMxQ1HTA',
    range: 'leads!A1:E1',
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    resource: { values: data },
  }
  try {
    let googleResponse = await gsapi.spreadsheets.values.append(request)
    return googleResponse.status
  } catch (err) {
    console.log('Errors in appending: ', err)
    return new Response('Error adding contact data to form', {
      status: 400,
    })
  }
}

export async function sendMessage(formData: FormData) {
  'use server'
  const token = `${formData.get('token')}`

  const recaptchaResult = await recaptchaValidation(token)

  const captchaScore = Number(recaptchaResult.message)
  if (!recaptchaResult.successful) {
    // recaptcha was not successful
    return {
      statusCode: 400,
      message: recaptchaResult.message,
    }
  } else {
    if (captchaScore > 0.8) {
      // likley to be a human

      try {
        if (process.env.GOOGLE_SERVICE_ACCOUNT_KEYS !== undefined) {
          const keys = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEYS)
          const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
          const client = new google.auth.JWT(
            keys.client_email,
            undefined,
            keys.private_key,
            SCOPES
          )
          client.authorize((err) => {
            if (err) {
              console.log(err)
              return
            }
          })
          const timeStamp = `${new Date().toLocaleDateString('en-US', {
            month: '2-digit',
            day: 'numeric',
            year: 'numeric',
          })} ${new Date().toLocaleTimeString('en-US', {
            timeZone: 'America/NEW_YORK',
            timeZoneName: 'short',
          })}`
          const data = [
            [
              timeStamp,
              formData.get('name'),
              formData.get('email'),
              formData.get('phone'),
              formData.get('message'),
            ],
          ]

          const googleStatus = await gsrun(client, data)
          if (googleStatus === 200) {
            return { message: googleStatus }
          }
        } else {
          throw new Error()
        }
      } catch (e: unknown) {
        const error = e as AxiosError
        return { message: error }
      }
    }
  }
  return { message: recaptchaResult.message }
}
