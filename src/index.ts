import { FamousQuote } from './types/famousQuote'
import { Weather } from './types/weather'

const main = () => {
  const accessToken = PropertiesService.getScriptProperties().getProperty(
    'LINE_CHANNEL_ACCESS_TOKEN'
  )
  if (accessToken === null) {
    throw new Error('LINE_CHANNEL_ACCESS_TOKEN is not set.')
  }
  const sender = PropertiesService.getScriptProperties().getProperty('LINE_CHANNEL_SENDER')
  if (sender === null) {
    throw new Error('LINE_CHANNEL_SENDER is not set.')
  }

  const date = new Date()

  const messages = message(date, getFamousQuote()[0], getWeather('110010'))

  const url = 'https://api.line.me/v2/bot/message/push'
  const headers: GoogleAppsScript.URL_Fetch.HttpHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  }
  const body = {
    to: sender,
    messages: messages,
  }
  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'post',
    headers: headers,
    payload: JSON.stringify(body),
  }
  UrlFetchApp.fetch(url, options)
}

const getFamousQuote = (): FamousQuote[] => {
  const response = UrlFetchApp.fetch('https://meigen.doodlenote.net/api/json.php')
  const json = response.getContentText()
  const data = JSON.parse(json)
  return data
}

const getWeather = (id: string): Weather => {
  const response = UrlFetchApp.fetch(`https://weather.tsukumijima.net/api/forecast?city=${id}`)
  const json = response.getContentText()
  const data = JSON.parse(json)
  return data
}

import greetingList from './config/greetingList'

function message(date: Date, famousQuote: FamousQuote, weather: Weather) {
  const greeting =
    greetingList.find((_) => _.date === `${date.getMonth() + 1}/${date.getDate()}`)?.greeting ||
    'おはようございます'

  return [
    {
      type: 'flex',
      altText: 'おはようございます',
      contents: {
        type: 'carousel',
        contents: [
          {
            type: 'bubble',
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: greeting,
                  size: 'xl',
                  wrap: true,
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '今日は',
                    },
                    {
                      type: 'text',
                      size: 'xxl',
                      align: 'center',
                      text: `${date.getMonth() + 1}月${date.getDate()}日(${
                        ['日', '月', '火', '水', '木', '金', '土'][date.getDay()]
                      })`,
                      color: () => {
                        switch (date.getDay()) {
                          case 0:
                            return '#ff0000'
                          case 6:
                            return '#0000ff'
                          default:
                            return '#000000'
                        }
                      },
                    },
                    {
                      type: 'text',
                      text: 'です。',
                      align: 'end',
                    },
                  ],
                },
                {
                  type: 'separator',
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '今日の名言',
                      size: 'xl',
                    },
                    {
                      type: 'text',
                      wrap: true,
                      text: famousQuote.meigen,
                      style: 'italic',
                    },
                    {
                      type: 'text',
                      text: `by ${famousQuote.auther}`,
                      size: 'xs',
                      align: 'end',
                      style: 'italic',
                      color: '#aaaaaa',
                    },
                  ],
                },
              ],
            },
          },
          {
            type: 'bubble',
            header: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: weather.title,
                  size: 'lg',
                  wrap: true,
                  action: {
                    type: 'uri',
                    label: 'action',
                    uri: weather.link,
                  },
                },
              ],
            },
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'box',
                  layout: 'horizontal',
                  contents: [
                    {
                      type: 'text',
                      text: weather.forecasts[0].telop || 'null',
                      size: 'lg',
                      wrap: true,
                    },
                    {
                      type: 'image',
                      url: weather.forecasts[0].image.url.replace('svg', 'png'),
                      size: 'xs',
                      aspectRatio: '1:1',
                      aspectMode: 'fit',
                    },
                  ],
                },
                {
                  type: 'box',
                  layout: 'baseline',
                  contents: [
                    {
                      type: 'text',
                      text: `最高気温: ${weather.forecasts[0].temperature.max?.celsius}℃`,
                    },
                  ],
                },
                {
                  type: 'box',
                  layout: 'horizontal',
                  contents: [
                    {
                      type: 'text',
                      text: weather.description.bodyText.split('。').slice(0, 2).join('。') + '。',
                      wrap: true,
                      size: 'xs',
                    },
                  ],
                },
              ],
            },
            footer: {
              type: 'box',
              layout: 'horizontal',
              contents: [
                {
                  type: 'text',
                  text: `最終更新: ${weather.description.publicTime}`,
                  size: 'xs',
                  wrap: true,
                  color: '#aaaaaa',
                },
              ],
            },
          },
        ],
      },
    },
  ]
}

function setTrigger(){
  const time = new Date();
  time.setHours(7);
  time.setMinutes(0);
  ScriptApp.newTrigger('main').timeBased().at(time).create();
}
