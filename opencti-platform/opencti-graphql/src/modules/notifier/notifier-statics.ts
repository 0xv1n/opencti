import type { JSONSchemaType } from 'ajv';
import type { NotifierConnector } from '../../generated/graphql';
import type { BasicStoreEntityNotifier } from './notifier-types';

// region Notifier User interface
export const NOTIFIER_CONNECTOR_UI = 'f39b8ab2c-8f5c-4167-a249-229f34d9442b';
// endregion
// region Notifier Email
export const NOTIFIER_CONNECTOR_EMAIL = '6f5e30a8-56d5-4ff1-8b8d-f90243f771dc';
export const NOTIFIER_CONNECTOR_SIMPLIFIED_EMAIL = '9f73d9f8-cc4c-432b-b5b0-be6b6d6c8d87';

export interface NOTIFIER_CONNECTOR_EMAIL_INTERFACE {
  title: string
  template: string
}

export interface NOTIFIER_CONNECTOR_SIMPLIFIED_EMAIL_INTERFACE {
  title: string
  header: string
  logo: string
  footer: string
  background_color: string
}

export const NOTIFIER_CONNECTOR_EMAIL_CONFIG: JSONSchemaType<NOTIFIER_CONNECTOR_EMAIL_INTERFACE> = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    template: { type: 'string' },
  },
  required: ['title', 'template'],
};
export const NOTIFIER_CONNECTOR_SIMPLIFIED_EMAIL_CONFIG: JSONSchemaType<NOTIFIER_CONNECTOR_SIMPLIFIED_EMAIL_INTERFACE> = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    header: { type: 'string' },
    logo: { type: 'string' },
    footer: { type: 'string' },
    background_color: { type: 'string' },
  },
  required: ['title'],
};
// endregion
// region Notifier Webhook
export const NOTIFIER_CONNECTOR_WEBHOOK = '08f9f00f-4e52-4466-ae27-be9fa9813a88';

export interface NOTIFIER_CONNECTOR_WEBHOOK_INTERFACE {
  verb: string
  url: string
  template: string
  params: { attribute: string, value: string }[],
  headers: { attribute: string, value: string }[],
}

export const NOTIFIER_CONNECTOR_WEBHOOK_CONFIG: JSONSchemaType<NOTIFIER_CONNECTOR_WEBHOOK_INTERFACE> = {
  type: 'object',
  properties: {
    verb: { type: 'string', enum: ['GET', 'POST', 'PUT', ' DELETE'] },
    url: { type: 'string' },
    template: { type: 'string' },
    params: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          attribute: {
            type: 'string',
          },
          value: {
            type: 'string',
          },
        },
        required: ['attribute', 'value']
      },
    },
    headers: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          attribute: {
            type: 'string',
          },
          value: {
            type: 'string',
          },
        },
        required: ['attribute', 'value']
      },
    },
  },
  required: ['url', 'verb', 'template'],
};

// endregion

export const BUILTIN_NOTIFIERS_CONNECTORS: Record<string, NotifierConnector> = {
  [NOTIFIER_CONNECTOR_EMAIL]: {
    id: NOTIFIER_CONNECTOR_EMAIL,
    connector_type: 'Notifier',
    name: 'Platform mailer',
    built_in: true,
    connector_schema: JSON.stringify(NOTIFIER_CONNECTOR_EMAIL_CONFIG),
    connector_schema_ui: JSON.stringify({
      template: {
        'ui:widget': 'textarea',
        'ui:options': {
          rows: 20,
        },
      }
    }),
  },
  [NOTIFIER_CONNECTOR_SIMPLIFIED_EMAIL]: {
    id: NOTIFIER_CONNECTOR_SIMPLIFIED_EMAIL,
    connector_type: 'Notifier',
    name: 'Simple mailer',
    built_in: true,
    connector_schema: JSON.stringify(NOTIFIER_CONNECTOR_SIMPLIFIED_EMAIL_CONFIG),
    connector_schema_ui: JSON.stringify({
      logo: {
        'ui:widget': 'file',
        'ui:options': { accept: 'image/*' } // Because of an open bug: this is not working yet https://github.com/rjsf-team/react-jsonschema-form/issues/3577
      },
      background_color: {
        'ui:widget': 'color', // Same, for now we can't have fully customized components, we will need to investigate in the future
      },
    }),
  },
  [NOTIFIER_CONNECTOR_WEBHOOK]: {
    id: NOTIFIER_CONNECTOR_WEBHOOK,
    connector_type: 'Notifier',
    name: 'Generic webhook',
    built_in: true,
    connector_schema: JSON.stringify(NOTIFIER_CONNECTOR_WEBHOOK_CONFIG),
    connector_schema_ui: JSON.stringify({
      template: {
        'ui:widget': 'textarea',
        'ui:options': {
          rows: 20,
        },
      }
    }),
  }
};

export const STATIC_NOTIFIERS: Array<BasicStoreEntityNotifier> = [
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  {
    id: 'f4ee7b33-006a-4b0d-b57d-411ad288653d',
    internal_id: 'f4ee7b33-006a-4b0d-b57d-411ad288653d',
    built_in: true,
    name: 'User interface',
    description: 'Publish notification to the user interface',
    notifier_connector_id: NOTIFIER_CONNECTOR_UI,
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  {
    id: '44fcf1f4-8e31-4b31-8dbc-cd6993e1b822',
    internal_id: '44fcf1f4-8e31-4b31-8dbc-cd6993e1b822',
    built_in: true,
    name: 'Default mailer',
    description: 'Send notification to the user email',
    notifier_connector_id: NOTIFIER_CONNECTOR_EMAIL,
    notifier_configuration: JSON.stringify({
      title: '[<%=notification.trigger_type%>] <%=notification.name%>',
      template: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
   <head>
      <meta content="en-us" http-equiv="Content-Language">
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
      <title>Cyber Threat Intelligence Digest</title>
      <style type="text/css">
         #outlook a {
         padding: 0;
         }
         .ReadMsgBody{
         width:100%;
         }
         .ExternalClass{
         width: 100%;
         }
         .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
         line-height: 100%;
         }
         body, table, td, p, a, li, blockquote{
         -webkit-text-size-adjust :100%; 
         -ms-text-size-adjust: 100%;
         }
         table, td {
         mso-table-lspace: 0pt; 
         mso-table-rspace: 0pt;
         }
         img{
         -ms-interpolation-mode: bicubic;
         }
         * {
         font-family: 'Arial';
         }
         body {
         margin: 0;
         padding: 0;
         background-color: #f8f8f8;
         background: #f8f8f8;
         }
      </style>
   </head>
   <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" bgcolor="#f5f8fa" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; margin: 0; padding:0; font-family: Helvetica, Arial, sans-serif; font-size: 16px; height: 100%; width: 100%; min-width: 100%;">
      <table id="outerWrapper" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" bgcolor="#f5f8fa" style="font-family: Helvetica, Arial, sans-serif; font-size:16px; color: #425b76; line-height: 1.5; width: 100%; min-width: 100%; background-color:#f5f8fa;">
         <tbody>
            <tr>
               <td align="center" valign="top">
                  <table border="0" cellpadding="0" cellspacing="0" width="700" bgcolor="#ffffff" opacity="1" style="width: 700px; background-color:#ffffff;" class="emailWrapper">
                     <tbody>
                        <tr>
                           <td align="center" valign="top" width="100%" bgcolor="#ffffff" style="width: 100%; min-width: 100%; background-color:#ffffff;">
                              <table cellpadding="0" border="0" cellspacing="0" width="100%" style="width: 100%; min-width:100%;">
                                 <tbody>
                                    <tr>
                                       <td cellpadding="0" align="center" valign="middle" width="100%" style="height: 4px; background-color: #001bda; width: 100%; min-width:100%; font-size:4px; line-height: 4px;"><span style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width: 100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size: 0;"> &nbsp;</span></td>
                                    </tr>
                                    <tr>
                                       <td align="center" valign="middle" width="100%" style="width: 100%; min-width:100%;" class="logo"><img src="data:image/png;base64,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LjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOjVhNDcwMDA5LTc4MWEtNDM0ZC1iY2ZlLWM0YjgyYjNjZDYzNyIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDplMjg2NjFmNi05ZmQ1LTRjMGItODg4NS0yMTQxNzc3OWNiYjMiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0Yzc0ODY3Zi1hMzcxLTRkZmMtYTI0OS1kZDYwN2VkMWIxZjIiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJXaW5kb3dzIgogICBHSU1QOlRpbWVTdGFtcD0iMTcxMTE3MTI4OTY2MTUyMSIKICAgR0lNUDpWZXJzaW9uPSIyLjEwLjMyIgogICB0aWZmOk9yaWVudGF0aW9uPSIxIgogICB4bXA6Q3JlYXRvclRvb2w9IkdJTVAgMi4xMCIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNDowMzoyM1QxNjoyMToyOCsxMTowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQ6MDM6MjNUMTY6MjE6MjgrMTE6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMjlhZTNmMC0xMDQyLTRiMGUtOTI0Yi02MmY5MzRkZGUyNzAiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoV2luZG93cykiCiAgICAgIHN0RXZ0OndoZW49IjIwMjQtMDMtMjNUMTY6MjE6MjkiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+tS7NAQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAAAd0SU1FB+gDFwUVHe7Vbp8AACAASURBVHja7d1/cFT1vfDxj0mWzSYhS36QBBKTcKXiRWlYGG9LsI/PADadSYBpL60XeIZmJq1Cf4zpKCF1imK1FYiMOK2KLTwDjMiD3taKZOZGIDNMBe2tGrZeqVg0P5pAsgTC5tdmyQ+fP9KlIQaSnO/ZPT/2/Zrp3Ht7zbo5e/bkvM/3e77nFsn+5HMBAAAAAACGimETAAAAAABAoAMAAAAAAAIdAAAAAAACHQAAAAAAEOgAAAAAABDoAAAAAACAQAcAAAAAgEAHAAAAAAAEOgAAAAAABDoAAAAAACDQAQAAAAAg0AEAAAAAAIEOAAAAAACBDgAAAAAACHQAAAAAAAh0AAAAAABAoAMAAAAAQKADAAAAAAACHQAAAAAAAh0AAAAAABDoAAAAAAAQ6AAAAAAAgEAHAAAAAIBABwAAAAAABDoAAAAAAAQ6AAAAAAAg0AEAAAAAINABAAAAAACBDgAAAAAAgQ4AAAAAAAh0AAAAAAAIdIjIy1VuqavOMvV7PLovTY7uS+PD0lFZiUMaTuVIWYnD1O+zrjpLXq5y84EBAAAABLr9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" alt="OpenCTI" width="250" style="vertical-align: middle; clear: both; width: 250px; max-width: 250px; padding-top: 40px; padding-bottom: 40px;"></td>
                                    </tr>
                                 </tbody>
                              </table>
                              <table border="0" cellpadding="0" cellspacing="0" width="500" bgcolor="#ffffff" style="width: 500px; background-color:#ffffff;" class="emailContainer">
                                 <tbody>
                                    <tr>
                                       <td align="left" valign="top" width="100%" style="width: 100%; min-width: 100%;">
                                          <hr style="height: 1px; color: #eaf0f6; background-color: #eaf0f6; border: none; margin: 0px; padding: 0px;">
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 0; height: 15px; width: 100%; min-width: 100%; line-height: 0;">
                                             <tbody>
                                                <tr>
                                                   <td height="15"><span style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width: 100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size: 0;"> &nbsp;</span>
                                                   </td>
                                                </tr>
                                             </tbody>
                                          </table>
                                          <table cellpadding="0" border="0" cellspacing="0" width="100%" style="color: #425b76; font-size: 20px; width: 100%; margin: initial; min-width: 100%;">
                                             <tbody>
                                                <tr>
                                                   <td align="center" valign="middle" style="padding: 0; ">
                                                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 0; height: 10px; width: 100%; min-width: 100%; line-height: 0;">
                                                         <tbody>
                                                            <tr>
                                                               <td height="10"><span style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width: 100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size: 0;"> &nbsp;</span>
                                                               </td>
                                                            </tr>
                                                         </tbody>
                                                      </table>
                                                      <h1 style="font-size: 24px; font-weight: 600; margin: 0; text-align: center"><%=settings.platform_title%></h1>
                                                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 0; height: 20px; width: 100%; min-width: 100%; line-height: 0;">
                                                         <tbody>
                                                            <tr>
                                                               <td height="20"><span style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width: 100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size: 0;"> &nbsp;</span>
                                                               </td>
                                                            </tr>
                                                         </tbody>
                                                      </table>
                                                      <h2 style="font-size: 18px; font-weight: 400; margin: 0; text-align: center">Automatic digest subscription</h2>
                                                      <table border="0" cellpadding="0" cellspacing="0" width="100%"style="font-size: 0; height: 30px; width: 100%; min-width: 100%; line-height: 0;">
                                                         <tbody>
                                                            <tr>
                                                               <td height="30"><span style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width:100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size:0;"> &nbsp;</span>
                                                               </td>
                                                            </tr>
                                                         </tbody>
                                                      </table>
                                                      <hr style="height: 1px; color: #eaf0f6; background-color: #eaf0f6; border: none; margin: 0px; padding: 0px;">
                                                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 0; height: 30px; width: 100%; min-width: 100%; line-height: 0;">
                                                         <tbody>
                                                            <tr>
                                                               <td height="30"><span style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width: 100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size: 0;"> &nbsp;</span>
                                                               </td>
                                                            </tr>
                                                         </tbody>
                                                      </table>
                                                   </td>
                                                </tr>
                                             </tbody>
                                          </table>
                                          <% notification_content.forEach((contentLine)=> { %>
                                            <table cellpadding="0" border="0" cellspacing="0" width="100%" style="color: #425b76; font-size: 20px; width: 100%; margin: initial; min-width: 100%;">
                                               <tbody>
                                                  <tr>
                                                     <td align="center" valign="middle" style="padding: 0; ">
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 0; height: 20px; width: 100%; min-width: 100%; line-height: 0;">
                                                           <tbody>
                                                              <tr>
                                                                 <td height="20"><span style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width: 100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size: 0;"> &nbsp;</span>
                                                                 </td>
                                                              </tr>
                                                           </tbody>
                                                        </table>
                                                        <h3 style="font-size: 15px; font-weight: 600; margin: 0; text-align: left"><%= contentLine.title %></h3>
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%"style="font-size: 0; height: 15px; width: 100%; min-width: 100%; line-height: 0;">
                                                           <tbody>
                                                              <tr>
                                                                 <td height="15"><span style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width:100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size:0;"> &nbsp;</span>
                                                                 </td>
                                                              </tr>
                                                           </tbody>
                                                        </table>
                                                        <hr style="height: 1px; color: #eaf0f6; background-color: #eaf0f6; border: none; margin: 0px; padding: 0px;">
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 0; height: 10px; width: 100%; min-width: 100%; line-height: 0;">
                                                           <tbody>
                                                              <tr>
                                                                 <td height="10"><span style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width: 100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size: 0;"> &nbsp;</span>
                                                                 </td>
                                                              </tr>
                                                           </tbody>
                                                        </table>
                                                     </td>
                                                  </tr>
                                               </tbody>
                                            </table>
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 0; height: 10px; width: 100%; min-width: 100%; line-height: 0;">
                                               <tbody>
                                                  <tr>
                                                     <td height="10"><span style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width: 100%; height: 1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size: 0;">&nbsp;</span>
                                                     </td>
                                                  </tr>
                                               </tbody>
                                            </table>
                                            <% contentLine.events.forEach((contentEvent)=> { %>
                                              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-bottom: 1px solid #eaf0f6; margin-bottom: 20px;">
                                                 <tbody>
                                                    <tr>
                                                       <td valign="top" style="line-height: 1.4; padding-bottom: 20px; min-width:310px;">
                                                          <%= contentEvent.message %>
                                                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 0; height: 5px; width: 100%; min-width: 100%; line-height: 0;">
                                                             <tbody>
                                                                <tr>
                                                                   <td height="5"><span style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width: 100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size: 0;"> &nbsp;</span>
                                                                   </td>
                                                                </tr>
                                                             </tbody>
                                                          </table>
                                                          <section style="font-size: 12px">
                                                             <span style="margin-right: 10px; display: inline-block;">
                                                                <span style="font-style: italic;">Operation:</span> <%= contentEvent.operation %>
                                                             </span>
                                                          </section>
                                                       </td>
                                                       <td width="20" valign="top" style="font-size: 1px; min-width: 20px;"></td>
                                                       <td width="50" valign="top">
                                                          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width: 100%; min-width: 100%;">
                                                             <tbody>
                                                                <tr>
                                                                   <td align="center">
                                                                      <table border="0" cellspacing="0" cellpadding="0">
                                                                         <tbody>
                                                                            <tr>
                                                                               <td align="center" style="border-radius: 3px;" bgcolor="#eaf0f6" width="30px"><a href="<%=platform_uri%>/dashboard/id/<%= contentEvent.instance_id %>" target="_blank" style="border: 1px solid #eaf0f6; border-radius: 3px; color: #FFFFFF; display: inline-block; font-size: 14px; font-weight: 400; line-height: 1; padding: 12px 20px; text-decoration: none; width: 30px; min-width: 30px; white-space: nowrap; border: 1px solid #cbd6e2; color: #425b76; height: 12px; padding: 8px 12px; font-size: 12px; line-height: 12px;">View</a></td>
                                                                            </tr>
                                                                         </tbody>
                                                                      </table>
                                                                   </td>
                                                                </tr>
                                                             </tbody>
                                                          </table>
                                                       </td>
                                                    </tr>
                                                 </tbody>
                                              </table>
                                              <% }) %>
                                          <% }) %>
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 0; height: 50px; width: 100%; min-width: 100%; line-height: 0;">
                                             <tbody>
                                                <tr>
                                                   <td height="50"><span style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none;text-overflow: ellipsis; opacity: 0; width:100%; min-width: 100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size: 0;"> &nbsp;</span>
                                                   </td>
                                                </tr>
                                             </tbody>
                                          </table>
                                       </td>
                                    </tr>
                                 </tbody>
                              </table>
                           </td>
                        </tr>
                        <tr>
                           <td>
                              <table id="footer" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" bgcolor="#f5f8fa" style="width: 100%; min-width: 100%;">
                                 <tbody>
                                    <tr>
                                       <td align="center" valign="top">
                                          <table border="0" cellpadding="0" cellspacing="0" height="100%" width="500" style="width: 500px;">
                                             <tbody>
                                                <tr>
                                                   <td align="center" valign="top">
                                                      <table cellpadding="0" border="0" cellspacing="0" width="100%" style="color: #425b76; background-color: ; font-size: 14px; width: 100%; margin: initial; min-width: 100%; line-height: 24px">
                                                         <tbody>
                                                            <tr>
                                                               <td align="center" valign="middle" style="padding: 5px 0 65px;">
                                                                  <p style="font-size: 12px; color: #516f90">Copyright &copy; 2024 OpenCTI&trade;<br>Powered by <a style="color: #001bda; text-decoration:none;" href="https://filigran.io" target="_blank">Filigran</a></p>
                                                               </td>
                                                            </tr>
                                                         </tbody>
                                                      </table>
                                                   </td>
                                                </tr>
                                             </tbody>
                                          </table>
                                       </td>
                                    </tr>
                                 </tbody>
                              </table>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </td>
            </tr>
         </tbody>
      </table>
   </body>
</html>
      `
    })
  }
];

export const SIMPLIFIED_EMAIL_TEMPLATE = `
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<% function parseMarkdownLink(text) {
  if (!text) {
    return '';
  }
  const regex = /(.*)\\[(.*?)\\]\\((.*?)\\)/;
  const match = text.match(regex);
  if (match) {
    const text = match[1];
    const linkText = match[2].split(' ').map((e) => escape(e)).join(' ');
    const linkUrl = match[3].split(' ').map((e) => escape(e)).join(' ');
    return text + '<a style="color:#fff; text-decoration:underline;" href="' + linkUrl +'">' + linkText + '</a>';
  }
  return text; // If it's not a link, return the original text
} %>
<html>
   <head>
      <meta content="en-us" http-equiv="Content-Language">
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
      <title>Cyber Threat Intelligence Digest</title>
      <style type="text/css">
         #outlook a {
         padding: 0;
         }
         .ReadMsgBody{
         width:100%;
         }
         .ExternalClass{
         width: 100%;
         }
         .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
         line-height: 100%;
         }
         body, table, td, p, a, li, blockquote{
         -webkit-text-size-adjust :100%; 
         -ms-text-size-adjust: 100%;
         }
         table, td {
         mso-table-lspace: 0pt; 
         mso-table-rspace: 0pt;
         }
         img{
         -ms-interpolation-mode: bicubic;
         }
         * {
         font-family: 'Arial';
         }
         body {
         margin: 0;
         padding: 0;
         background-color: #f8f8f8;
         background: #f8f8f8;
         }
      </style>
   </head>
   <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" bgcolor="#f5f8fa" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; margin: 0; padding:0; font-family: Helvetica, Arial, sans-serif; font-size: 16px; height: 100%; width: 100%; min-width: 100%;">
      <table id="outerWrapper" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" bgcolor="#f5f8fa" style="font-family: Helvetica, Arial, sans-serif; font-size:16px; color: #425b76; line-height: 1.5; width: 100%; min-width: 100%; background-color:#f5f8fa;">
         <tbody>
            <tr>
               <td align="center" valign="top">
                  <table border="0" cellpadding="0" cellspacing="0" width="700" bgcolor="#ffffff" opacity="1" style="width: 700px; background-color:#ffffff;" class="emailWrapper">
                     <tbody>
                        <tr>
                           <td align="center" valign="top" width="100%" bgcolor="#ffffff" style="width: 100%; min-width: 100%; background-color:#ffffff;">
                              <table cellpadding="0" border="0" cellspacing="0" width="100%" style="width: 100%; min-width:100%;">
                                 <tbody>
                                    <tr>
                                       <td cellpadding="0" align="center" valign="middle" width="100%" style="height: 4px; background-color: <%=background_color%>; width: 100%; min-width:100%; font-size:4px; line-height: 4px;"><span style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width: 100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size: 0;"> &nbsp;</span></td>
                                    </tr>
                                    <tr>
                                       <td align="center" valign="middle" width="100%" style="width: 100%; min-width:100%;" class="logo"><img src="<%=logo%>" alt="OpenCTI" width="250" style="vertical-align: middle; clear: both; width: 250px; max-width: 250px; padding-top: 40px; padding-bottom: 40px;"></td>
                                    </tr>
                                 </tbody>
                              </table>
                              <table border="0" cellpadding="0" cellspacing="0" width="500" bgcolor="#ffffff" style="width: 500px; background-color:#ffffff;" class="emailContainer">
                                 <tbody>
                                    <tr>
                                       <td align="left" valign="top" width="100%" style="width: 100%; min-width: 100%;">
                                          <hr style="height: 1px; color: #eaf0f6; background-color: #eaf0f6; border: none; margin: 0px; padding: 0px;">
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 0; height: 15px; width: 100%; min-width: 100%; line-height: 0;">
                                             <tbody>
                                                <tr>
                                                   <td height="15"><span style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width: 100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size: 0;"> &nbsp;</span>
                                                   </td>
                                                </tr>
                                             </tbody>
                                          </table>
                                          <table cellpadding="0" border="0" cellspacing="0" width="100%" style="color: #425b76; font-size: 20px; width: 100%; margin: initial; min-width: 100%;">
                                             <tbody>
                                                <tr>
                                                   <td align="center" valign="middle" style="padding: 0; ">
                                                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 0; height: 10px; width: 100%; min-width: 100%; line-height: 0;">
                                                         <tbody>
                                                            <tr>
                                                               <td height="10"><span style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width: 100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size: 0;"> &nbsp;</span>
                                                               </td>
                                                            </tr>
                                                         </tbody>
                                                      </table>
                                                      <h1 style="font-size: 24px; font-weight: 600; margin: 0; text-align: center"><%=settings.platform_title%></h1>
                                                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 0; height: 20px; width: 100%; min-width: 100%; line-height: 0;">
                                                         <tbody>
                                                            <tr>
                                                               <td height="20"><span style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width: 100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size: 0;"> &nbsp;</span>
                                                               </td>
                                                            </tr>
                                                         </tbody>
                                                      </table>
                                                      <h2 style="font-size: 18px; font-weight: 400; margin: 0; text-align: center"><%- parseMarkdownLink(header)%></h2>
                                                      <table border="0" cellpadding="0" cellspacing="0" width="100%"style="font-size: 0; height: 30px; width: 100%; min-width: 100%; line-height: 0;">
                                                         <tbody>
                                                            <tr>
                                                               <td height="30"><span style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width:100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size:0;"> &nbsp;</span>
                                                               </td>
                                                            </tr>
                                                         </tbody>
                                                      </table>
                                                      <hr style="height: 1px; color: #eaf0f6; background-color: #eaf0f6; border: none; margin: 0px; padding: 0px;">
                                                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 0; height: 30px; width: 100%; min-width: 100%; line-height: 0;">
                                                         <tbody>
                                                            <tr>
                                                               <td height="30"><span style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width: 100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size: 0;"> &nbsp;</span>
                                                               </td>
                                                            </tr>
                                                         </tbody>
                                                      </table>
                                                   </td>
                                                </tr>
                                             </tbody>
                                          </table>
                                          <% notification_content.forEach((contentLine)=> { %>
                                            <table cellpadding="0" border="0" cellspacing="0" width="100%" style="color: #425b76; font-size: 20px; width: 100%; margin: initial; min-width: 100%;">
                                               <tbody>
                                                  <tr>
                                                     <td align="center" valign="middle" style="padding: 0; ">
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 0; height: 20px; width: 100%; min-width: 100%; line-height: 0;">
                                                           <tbody>
                                                              <tr>
                                                                 <td height="20"><span style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width: 100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size: 0;"> &nbsp;</span>
                                                                 </td>
                                                              </tr>
                                                           </tbody>
                                                        </table>
                                                        <h3 style="font-size: 15px; font-weight: 600; margin: 0; text-align: left"><%= contentLine.title %></h3>
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%"style="font-size: 0; height: 15px; width: 100%; min-width: 100%; line-height: 0;">
                                                           <tbody>
                                                              <tr>
                                                                 <td height="15"><span style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width:100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size:0;"> &nbsp;</span>
                                                                 </td>
                                                              </tr>
                                                           </tbody>
                                                        </table>
                                                        <hr style="height: 1px; color: #eaf0f6; background-color: #eaf0f6; border: none; margin: 0px; padding: 0px;">
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 0; height: 10px; width: 100%; min-width: 100%; line-height: 0;">
                                                           <tbody>
                                                              <tr>
                                                                 <td height="10"><span style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width: 100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size: 0;"> &nbsp;</span>
                                                                 </td>
                                                              </tr>
                                                           </tbody>
                                                        </table>
                                                     </td>
                                                  </tr>
                                               </tbody>
                                            </table>
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 0; height: 10px; width: 100%; min-width: 100%; line-height: 0;">
                                               <tbody>
                                                  <tr>
                                                     <td height="10"><span style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width: 100%; height: 1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size: 0;">&nbsp;</span>
                                                     </td>
                                                  </tr>
                                               </tbody>
                                            </table>
                                            <% contentLine.events.forEach((contentEvent)=> { %>
                                              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-bottom: 1px solid #eaf0f6; margin-bottom: 20px;">
                                                 <tbody>
                                                    <tr>
                                                       <td valign="top" style="line-height: 1.4; padding-bottom: 20px; min-width:310px;">
                                                          <%= contentEvent.message %>
                                                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 0; height: 5px; width: 100%; min-width: 100%; line-height: 0;">
                                                             <tbody>
                                                                <tr>
                                                                   <td height="5"><span style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width: 100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size: 0;"> &nbsp;</span>
                                                                   </td>
                                                                </tr>
                                                             </tbody>
                                                          </table>
                                                          <section style="font-size: 12px">
                                                             <span style="margin-right: 10px; display: inline-block;">
                                                                <span style="font-style: italic;">Operation:</span> <%= contentEvent.operation %>
                                                             </span>
                                                          </section>
                                                       </td>
                                                       <td width="20" valign="top" style="font-size: 1px; min-width: 20px;"></td>
                                                       <td width="50" valign="top">
                                                          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width: 100%; min-width: 100%;">
                                                             <tbody>
                                                                <tr>
                                                                   <td align="center">
                                                                      <table border="0" cellspacing="0" cellpadding="0">
                                                                         <tbody>
                                                                            <tr>
                                                                               <td align="center" style="border-radius: 3px;" bgcolor="#eaf0f6" width="30px"><a href="<%=platform_uri%>/dashboard/id/<%= contentEvent.instance_id %>" target="_blank" style="border: 1px solid #eaf0f6; border-radius: 3px; color: #FFFFFF; display: inline-block; font-size: 14px; font-weight: 400; line-height: 1; padding: 12px 20px; text-decoration: none; width: 30px; min-width: 30px; white-space: nowrap; border: 1px solid #cbd6e2; color: #425b76; height: 12px; padding: 8px 12px; font-size: 12px; line-height: 12px;">View</a></td>
                                                                            </tr>
                                                                         </tbody>
                                                                      </table>
                                                                   </td>
                                                                </tr>
                                                             </tbody>
                                                          </table>
                                                       </td>
                                                    </tr>
                                                 </tbody>
                                              </table>
                                              <% }) %>
                                          <% }) %>
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 0; height: 50px; width: 100%; min-width: 100%; line-height: 0;">
                                             <tbody>
                                                <tr>
                                                   <td height="50"><span style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none;text-overflow: ellipsis; opacity: 0; width:100%; min-width: 100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size: 0;"> &nbsp;</span>
                                                   </td>
                                                </tr>
                                             </tbody>
                                          </table>
                                       </td>
                                    </tr>
                                 </tbody>
                              </table>
                           </td>
                        </tr>
                        <tr>
                           <td>
                              <table id="footer" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" bgcolor="#f5f8fa" style="width: 100%; min-width: 100%;">
                                 <tbody>
                                    <tr>
                                       <td align="center" valign="top">
                                          <table border="0" cellpadding="0" cellspacing="0" height="100%" width="500" style="width: 500px;">
                                             <tbody>
                                                <tr>
                                                   <td align="center" valign="top">
                                                      <table cellpadding="0" border="0" cellspacing="0" width="100%" style="color: #425b76; background-color: ; font-size: 14px; width: 100%; margin: initial; min-width: 100%; line-height: 24px">
                                                         <tbody>
                                                            <tr>
                                                               <td align="center" valign="middle" style="padding: 5px 0 65px;">
                                                                  <p style="font-size: 12px; color: #516f90"><%- parseMarkdownLink(footer)%><br>Copyright &copy; 2024 OpenCTI&trade;<br>Powered by <a style="color: #001bda; text-decoration:none;" href="https://filigran.io" target="_blank">Filigran</a></p>
                                                               </td>
                                                            </tr>
                                                         </tbody>
                                                      </table>
                                                   </td>
                                                </tr>
                                             </tbody>
                                          </table>
                                       </td>
                                    </tr>
                                 </tbody>
                              </table>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </td>
            </tr>
         </tbody>
      </table>
   </body>
</html>
`;

export const DEFAULT_TEAM_MESSAGE = {
  notifier_connector_id: NOTIFIER_CONNECTOR_WEBHOOK,
  name: 'Sample of Microsoft Teams message for live trigger',
  description: 'This is a sample notifier to send a Microsoft Teams message. The template is already filled and fully customizable. You need to add the correct Microsoft Teams endpoint to get it working.',
  notifier_configuration: `
    {
      "template": "{\\n        \\"type\\": \\"message\\",\\n        \\"attachments\\": [\\n            {\\n                \\"contentType\\": \\"application/vnd.microsoft.card.thumbnail\\",\\n                \\"content\\": {\\n                    \\"subtitle\\": \\"Operation : <%=notification_content[0].events[0].operation%>\\",\\n                    \\"text\\": \\"<%=(new Date(notification.created)).toLocaleString()%>\\",\\n                    \\"title\\": \\"<%=notification_content[0].events[0].message%>\\",\\n                    \\"buttons\\": [\\n                        {\\n                            \\"type\\": \\"openUrl\\",\\n                            \\"title\\": \\"See in OpenCTI\\",\\n                            \\"value\\": \\"https://YOUR_OPENCTI_URL/dashboard/id/<%=notification_content[0].events[0].instance_id%>\\"\\n                        }\\n                    ]\\n                }\\n            }\\n        ]\\n    }",
      "url": "https://YOUR_DOMAIN.webhook.office.com/YOUR_ENDPOINT",
      "verb": "POST"
    }
  `
};

export const DEFAULT_TEAM_DIGEST_MESSAGE = {
  notifier_connector_id: NOTIFIER_CONNECTOR_WEBHOOK,
  name: 'Sample of Microsoft Teams message for digest trigger',
  description: 'This is a sample notifier to send a Microsoft Teams message. The template is already filled and fully customizable. You need to add the correct Microsoft Teams endpoint to get it working.',
  notifier_configuration: `
    {
      "template": "{\\n    \\"type\\": \\"message\\",\\n    \\"attachments\\": [\\n        {\\n            \\"contentType\\": \\"application/vnd.microsoft.card.adaptive\\",\\n            \\"content\\": {\\n                \\"$schema\\": \\"http://adaptivecards.io/schemas/adaptive-card.json\\",\\n                \\"type\\": \\"AdaptiveCard\\",\\n                \\"version\\": \\"1.0\\",\\n                \\"body\\": [\\n                    {\\n                        \\"type\\": \\"Container\\",\\n                        \\"items\\": [\\n                            {\\n                                \\"type\\": \\"TextBlock\\",\\n                                \\"text\\": \\"<%=notification.name%>\\",\\n                                \\"weight\\": \\"bolder\\",\\n                                \\"size\\": \\"extraLarge\\"\\n                            }, {\\n                                \\"type\\": \\"TextBlock\\",\\n                                \\"text\\": \\"<%=(new Date(notification.created)).toLocaleString()%>\\",\\n                                \\"size\\": \\"medium\\"\\n                            }\\n                        ]\\n                    },\\n                    <% for(var i=0; i<notification_content.length; i++) { %>\\n                    {\\n                        \\"type\\": \\"Container\\",\\n                        \\"items\\": [<% for(var j=0; j<notification_content[i].events.length; j++) { %>\\n                            {\\n                                \\"type\\" : \\"TextBlock\\",\\n                                \\"text\\" : \\"[<%=notification_content[i].events[j].message%>](https://localhost:3000/dashboard/id/<%=notification_content[i].events[j].instance_id%>)\\"\\n                         \\t}<% if(j<(notification_content[i].events.length - 1)) {%>,<% } %>\\n                        <% } %>]\\n\\t\\t   }<% if(i<(notification_content.length - 1)) {%>,<% } %>\\n                    <% } %>\\n                ]\\n            }\\n        }\\n    ],\\n   \\"dataString\\": <%-JSON.stringify(notification)%>\\n}",
      "url": "https://YOUR_DOMAIN.webhook.office.com/YOUR_ENDPOINT",
      "verb": "POST"
    }
  `
};
