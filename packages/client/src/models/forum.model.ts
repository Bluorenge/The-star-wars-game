export interface ForumListItem {
  id: number;
  title: string;
  topicQuantity: number;
  answerQuantity: number;
}

export interface ForumAddTopicModalProps {
  selectedForum: ForumListItem | null;
  isForumAddTopicModalOpen: boolean;
  toggleOpenModalCreateTopic: () => void;
}
