export interface ForumListItem {
  id: number;
  title: string;
  topicQuantity: number;
  answerQuantity: number;
}

export interface AddTopicModalProps {
  selectedForum: ForumListItem | null;
  isModalAddTopicOpen: boolean;
  toggleOpenModalCreateTopic: () => void;
}
