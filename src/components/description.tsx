import { ListItem, Stack, UnorderedList } from "@chakra-ui/react";
import React from "react";

const Description = () => {
  return (
    <>
    <Stack>
      <p>
        記号の説明
      </p>
      <UnorderedList>
        <ListItem>⚪︎: ネットワーク利用制限はありません.</ListItem>
        <ListItem>
          △: ネットワーク利用制限は現状かかっていませんが, 前所有者の分割代金未払い等でネットワーク利用制限の対象になる可能性があります.
        </ListItem>
        <ListItem>
          ×: ネットワーク利用制限の対象です. いわゆる「赤ロム」状態です.
          利用制限のあるキャリアのモバイルネットワークは利用できません.
          SIMロック解除されている場合は他のキャリアのSIMカードが利用できる可能性はあります.
        </ListItem>
        <ListItem>
          -: 当該キャリアでの販売履歴がない, オープンマーケットのSIMフリーモデルであるなど,
          ネットワーク利用制限の対象外になっています.
          もしくはIMEIの入力が誤っています. 
        </ListItem>
      </UnorderedList>
      </Stack>
    </>
  );
};

export default Description;
