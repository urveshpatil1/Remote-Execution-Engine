import { useParams } from 'react-router-dom';
import CodeMirror, { Extension, ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { useEffect, useRef, useState } from 'react';
import { javascript } from '@codemirror/lang-javascript';
import { syntaxTree } from '@codemirror/language';
import { OptionType } from '../interfaces';
import Dropdown from '../components/common/Dropdown';
import { PanelGroup, Panel } from 'react-resizable-panels';
import { JS_CODE_SNIPPET, PYTHON_CODE_SNIPPET } from '../constants';
import Resize from '../components/common/Resize';
import { python } from '@codemirror/lang-python';

function ProblemPage() {
  const { id } = useParams();
  const refs = useRef<ReactCodeMirrorRef>({});
  const [extensionsList, setExtensionsList] = useState<Extension[]>([]);
  const [codeEditorValue, setCodeEditorValue] = useState<string | undefined>();
  const [selectedOption, setSelectedOption] = useState<string | null>('Javascript');

  const languagesList = [
    { id: 1, option: 'Javascript' },
    { id: 2, option: 'Python' },
  ];

  /**
   * The function `handleOptionClick` takes an option and a state setter function as arguments, updates
   * the selected option state, and closes the dropdown menu.
   */
  const handleOptionClick = (
    option: OptionType,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setSelectedOption(option.option);
    setIsOpen(false);
  };

  /**
   * The function `handleRunCode` parses the syntax tree of an editor, retrieves the statements, and
   * returns the code for each statement.
   */
  const handleRunCode = () => {
    if (refs?.current?.view?.state) {
      /* parse editor syntax tree */
      const tree = syntaxTree(refs?.current?.view?.state);
      /* get statements */
      const statements = tree.topNode.getChildren('Statement');
      if (statements && statements.length > 0) {
        statements.forEach((statement) => {
          if (refs?.current?.view) {
            const code = refs?.current?.view.state.sliceDoc(statement.from, statement.to);
            if (code) {
              alert(code);
              return code;
            }
          }
        });
      }
    }
  };

  useEffect(() => {
    if (selectedOption === 'Javascript') {
      setExtensionsList([javascript()]);
      setCodeEditorValue(JS_CODE_SNIPPET);
    } else if (selectedOption === 'Python') {
      setExtensionsList([python()]);
      setCodeEditorValue(PYTHON_CODE_SNIPPET);
    }
  }, [selectedOption]);

  useEffect(() => {
    /* Setting default code snippets */ 
    if (selectedOption === 'Javascript') {
      setCodeEditorValue(JS_CODE_SNIPPET);
    } else if (selectedOption === 'Python') {
      setCodeEditorValue(PYTHON_CODE_SNIPPET);
    }
  }, []);

  return (
    <div className="h-[92vh] w-screen bg-gradient-to-r from-black to-gray-800 text-white p-5 overflow-auto">
      <PanelGroup autoSaveId="example" direction="horizontal">
        <Panel defaultSize={20} minSize={20} order={1}>
          <div className="bg-zinc-800 text-white p-5 w-full h-full overflow-hidden rounded-md">
            <h1 className='mb-10'>Problem: {id}</h1>
            <h3 className='mb-10'>26. Remove Duplicates from Sorted Array</h3>
            <p>
              - Given an integer array nums sorted in non-decreasing order, remove the duplicates
              in-place such that each unique element appears only once. The relative order of the
              elements should be kept the same. - Consider the number of unique elements of nums to
              be k, to get accepted, you need to do the following things: Change the array nums such
              that the first k elements of nums contain the unique elements in the order they were
              present in nums initially.
            </p>
          </div>
        </Panel>
        <Resize />
        <Panel defaultSize={80} minSize={20} order={2}>
          <div className="flex flex-col w-full h-full">
            <div className="flex items-center justify-end rounded-t-lg bg-gray-600 p-3 text-white px-4">
              <button
                className="inline-flex justify-center items-center mr-4 px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-blue-900 transition ease-in-out duration-150"
                onClick={handleRunCode}
              >
                Run
              </button>
              <Dropdown
                options={languagesList}
                handleOptionClick={handleOptionClick}
                selectedOption={selectedOption}
              />
            </div>
            <CodeMirror
              style={{ overflow: 'auto' }}
              height="81vh"
              theme={'dark'}
              className="text-lg"
              ref={refs}
              value={codeEditorValue}
              onChange={(value) => setCodeEditorValue(value)}
              extensions={extensionsList}
            />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default ProblemPage;
