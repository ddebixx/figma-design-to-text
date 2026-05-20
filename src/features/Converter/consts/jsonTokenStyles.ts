import { JsonTokenType } from '@/features/Converter/utils/tokenizeJsonForDisplay'

export const JSON_TOKEN_STYLE_MAP: Record<JsonTokenType, string> = {
  [JsonTokenType.KEY]: 'text-zinc-400',
  [JsonTokenType.STRING]: 'text-[#9ece6a]',
  [JsonTokenType.NUMBER]: 'text-[#e0af68]',
  [JsonTokenType.BOOLEAN]: 'text-[#9d7cd8]',
  [JsonTokenType.NULL]: 'text-zinc-500 italic',
  [JsonTokenType.PUNCTUATION]: 'text-zinc-500',
  [JsonTokenType.WHITESPACE]: '',
}
