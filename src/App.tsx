/* components --- */
import PhotoUpload from './PhotoUpload';
import NameInput from './NameInput';
import ExpressionSelect from './ExpressionSelect';
import AreaTrigger from './AreaTrigger';

/* styled components --- */
import {
  StyledAsidePanel,
  StyledLink,
  StyledTitle,
  StyledTitleNotification,
} from './StyledComponents';

/* icons and styles --- */
import { AiFillGithub } from 'react-icons/ai';
import './styles.scss';

function App() {
  return (
    <div className="pageContainer">
      <section className="header">
        <h1 className="title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 14 14"
          >
            <g fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13.5 10.5v2a1 1 0 0 1-1 1h-2m0-13h2a1 1 0 0 1 1 1v2m-13 0v-2a1 1 0 0 1 1-1h2m0 13h-2a1 1 0 0 1-1-1v-2" />
              <circle cx="7" cy="4.5" r="2" />
              <path d="M10.16 10.5a3.5 3.5 0 0 0-6.32 0" />
            </g>
          </svg>
          Biometric identification
        </h1>
        <StyledLink href="https://github.com/JohnnieWalked">
          <AiFillGithub />
        </StyledLink>
      </section>

      <section className="workspace">
        <div className="controlPanel">
          <StyledTitle>Control panel</StyledTitle>
          <StyledAsidePanel>
            <PhotoUpload />
            <NameInput />
            <ExpressionSelect />
            <AreaTrigger />
          </StyledAsidePanel>
        </div>
        <article className="notification">
          <StyledTitleNotification>Privacy</StyledTitleNotification>
          <ul>
            <li>
              We do not collect any personal information from you during your
              visit to our website. Your browsing experience is entirely
              anonymous.
            </li>
            <li>
              We respect your privacy by not using any tracking cookies or
              analytics tools that monitor your online behavior.
            </li>
            <li>
              Any personal data, provided by user, have <i>temporary</i> status
              and will be deleted after closing tab.
            </li>
          </ul>
        </article>
      </section>
    </div>
  );
}

export default App;
