#!/bin/bash
echo "MSG=$MSG"

curl -s -X POST https://api.telegram.org/$TELEGRAM_BOT_TOKEN/sendMessage -d chat_id=$TELEGRAM_USER_ID  -d text="$MSG"

