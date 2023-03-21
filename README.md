# LINE Morning Greeting

Google Apps Script を使用して決まった時間に LINE のトークにその日の天気や名言を送信する

## Why Use Google App Script?

Google App Script は、Google アカウントさえあれば誰でも無料で使用でき、指定の時間にトリガーを設定することで、定期的に処理を実行することができる。

また、clasp を使用することで、VScode と TypeScript を使用して開発をすることができるため。

## Getting Started

### Google App Script にプッシュするまで

1. このリポジトリをクローンする

2. パッケージをインストール

```bash
pnpm install
```

3. clasp で Googleアカウント にログインする

```bash
pnpm clasp login
```

4. clasp を使用して、Google App Script のプロジェクトを作成する

```bash
pnpm clasp create --type standalone
```

5. Google App Script にファイルをプッシュする

```bash
pnpm clasp push
```

6. ブラウザでプロジェクトを開く

```bash
pnpm clasp open
```

### Google App Script の設定

1. スクリプト プロパティを設定

|プロパティ|値|
|:--|:--|
|LINE_CHANNEL_ACCESS_TOKEN|取得したトークン|
|LINE_CHANNEL_SENDER|送信するユーザー(グループ)のID

2. トリガーの設定

今回は、毎日7時に実行する方法を説明します。

Google App Script で、繰り返し実行する際は1時間単位での指定なので「毎日の〇時〇分」という指定はできません。

そのため、その日の7時にトリガーを設定する`setTrigger`を使用し、この関数を毎日「6〜7時」に実行するようにトリガーを設定します。
