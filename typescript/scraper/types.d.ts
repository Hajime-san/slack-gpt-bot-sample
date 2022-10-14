// https://api.slack.com/methods/conversations.history#examples
export type MessageResponse = {
  ok: boolean;
  messages: Array<MessageBody>;
  has_more: boolean;
  pin_count: number;
  channel_actions_ts: null;
  channel_actions_count: number;
  response_metadata: {
    next_cursor?: string;
    scopes: Array<string>;
    acceptedScopes: Array<string>;
  };
};

export type MessageBody = {
  client_msg_id?: string;
  type: string;
  subtype?: string;
  text: string;
  user: string;
  ts: string;
  display_as_bot?: boolean;
  team: string;
  attachments?: Array<{
    service_name: string;
    text: string;
    fallback: string;
    thumb_url: string;
    thumb_width: number;
    thumb_height: number;
    id: number;
  }>;
  blocks: [any];
  reactions?: [any];
  files?: [any];
};

export type UserResponse = {
  ok: true;
  user: {
    id: string;
    team_id: string;
    name: string;
    deleted: boolean;
    color: string;
    real_name: string;
    tz: string;
    tz_label: string;
    tz_offset: number;
    profile: {
      avatar_hash: string;
      status_text: string;
      status_emoji: string;
      real_name: string;
      display_name: string;
      real_name_normalized: string;
      display_name_normalized: string;
      email: string;
      image_24: string;
      image_32: string;
      image_48: string;
      image_72: string;
      image_192: string;
      image_512: string;
      team: string;
    };
    is_admin: boolean;
    is_owner: boolean;
    is_primary_owner: boolean;
    is_restricted: boolean;
    is_ultra_restricted: boolean;
    is_bot: boolean;
    updated: number;
    is_app_user: boolean;
    has_2fa: boolean;
  };
};
