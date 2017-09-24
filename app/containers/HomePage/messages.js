/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  projectIntroHeader: {
    id: 'aifi.containers.HomePage.project_intro.header',
    defaultMessage: 'AIFI: Asynchronous Interactive Feedback Interface',
  },
  projectIntroMessage: {
    id: 'aifi.containers.HomePage.project_intro.message',
    defaultMessage: 'Upload your presentation rehearsal video & collect feedback from peer interactively!',
  },
  presentationListHeader: {
    id: 'aifi.containers.HomePage.presentation_list.header',
    defaultMessage: 'Presentation List',
  },
  trymeMessage: {
    id: 'aifi.containers.HomePage.tryme.message',
    defaultMessage: 'Show Github repositories by',
  },
  trymeAtPrefix: {
    id: 'aifi.containers.HomePage.tryme.atPrefix',
    defaultMessage: '@',
  },
  presentationAddMessage: {
    id: 'aifi.containers.HomePage.presentation_add.message',
    defaultMessage: 'Add a Presentation Video',
  },
});
