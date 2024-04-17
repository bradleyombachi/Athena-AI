import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Ensure the worker is loaded from the correct path
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function MyApp({ pdfUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [highlightedText, setHighlightedText] = useState('')
  const [phrases, setPhrases] = useState([]);
  const [phraseNumber, setPhraseNumber] = useState(1)
  const [numPhrases, setNumPhrases] = useState(null)
  const [explanations, setExplanations] = useState([])
  const [explanation, setExplanation] = useState('')
  

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPhrases([]);
    setPhraseNumber(0);
  }

  const handleMouseUp = () => { // Moved function here
    const selectedText = window.getSelection().toString();
    if (selectedText.length > 0) {
      setHighlightedText(selectedText);
      setPhrases([...phrases, selectedText])
      setNumPhrases(phrases.length)
      setPhraseNumber(phrases.length)
    }
  };

  const handleExplanationChange = (event) => {
    setExplanation(event.target.value);
  };

  const handleExplanationSubmit = (event) => {
    event.preventDefault();
    setExplanations(explanations => {
      const updatedExplanations = [...explanations];
      updatedExplanations[phraseNumber] = explanation;
      return updatedExplanations;
    });

    setExplanation('');
  };

  useEffect(()=>{
    console.log(explanations)
  }, [explanations])

  
  return (
    <div className='flex flex-row'>
      <div onMouseUp={handleMouseUp}>
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      
      <p>
        Page {pageNumber} of {numPages}
      </p>
      {numPages > 1 && (
        <nav>
          <button
            onClick={() => setPageNumber(prevPage => Math.max(prevPage - 1, 1))}
            disabled={pageNumber === 1}
          >
            Previous
          </button>
          <button
            onClick={() => setPageNumber(prevPage => Math.min(prevPage + 1, numPages))}
            disabled={pageNumber === numPages}
          >
            Next
          </button>
        </nav>
      )}

 
      </div>


      <div className>
             {/* Highlight Text Section */}
      <div className="space-y-4 p-4 fixed">
        <div className="p-4 border border-gray-200 rounded-md">
          <strong>Highlighted Text:</strong> 
          {phrases.length > 0 && (
            <div>
            <div>
              <nav>
                <button
                  onClick={() => setPhraseNumber(prevPhrase => Math.max(prevPhrase - 1, 0))}
                  disabled={phraseNumber === 0}
                >
                  Previous
                </button>
                <button
                  onClick={() => setPhraseNumber(prevPhrase => Math.min(prevPhrase + 1, phrases.length - 1))}
                  disabled={phraseNumber === phrases.length - 1}
                >
                  Next
                </button>
              </nav>
              <p>Phrase {phraseNumber + 1} of {phrases.length}</p>
              {/* Displaying the selected phrase */}
              <div className="text-lg text-blue-500">
                {phrases[phraseNumber]}
              </div>
            </div>
            <form onSubmit={handleExplanationSubmit}>
         <label htmlFor="explanation">Explanation</label>
         <input 
         type="text"
         className='flex border-2 border-gray-300 rounded-md'
         value={explanation}
         onChange={handleExplanationChange}
         /> 
         <button className="mt-3"type="submit">Submit</button>
           </form>

            </div>
          )}

        </div>

      </div>
      
      </div>

    </div>
    
  );
}

export default MyApp;
