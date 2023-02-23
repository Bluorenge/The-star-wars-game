export interface ForumListItem {
  id: number;
  title: string;
  topicQuantity: number;
  answerQuantity: number;
}

export interface AddTopicModalProps {
  isModalAddTopicOpen: boolean;
  toggleOpenModalCreateTopic: () => void;
}
