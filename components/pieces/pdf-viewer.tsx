import { useDashboard } from "@/contexts/DashboardContext";
import { ApiResponse } from "@/models/api";
import { Viewer, SpecialZoomLevel, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";

import { highlightPlugin, Trigger } from "@react-pdf-viewer/highlight";
import type { RenderHighlightsProps } from "@react-pdf-viewer/highlight";
// import {jumpToPage} from '@react-pdf-viewer/page-navigation';

import React, { useEffect, useRef, useState } from "react";

interface Props {
  fileData: ApiResponse<{ signedUrl: string }>;
}

const PDFViewer = ({ fileData }: Props) => {
  // const defaultLayoutPluginInstance = defaultLayoutPlugin({
  //   sidebarTabs: (defaultTabs) => [
  //     defaultTabs[0], // Thumbnails tab
  //   ],
  // });

  const pageNavigationPluginInstance = pageNavigationPlugin();
  // const { jumpToPage } = pageNavigationPluginInstance;
  const { jumpToPage } = pageNavigationPluginInstance;

  const viewerRef = useRef<Viewer>(null);
  const { reference, isPdfLoaded, setIsPdfLoaded } = useDashboard();

  const [boundingBox, setBoundingBox] = useState<{
    pageIndex: number;
    x0: number;
    y0: number;
    x1: number;
    y1: number;
  } | null>(null);

  useEffect(() => {
    if (isPdfLoaded && reference) {
      console.log(reference);
      const newBoundingBox = [reference].map((ref) => ({
        pageIndex: ref.pageNumber - 1,
        x0: ref.boundingBox[0],
        y0: ref.boundingBox[1],
        x1: ref.boundingBox[2],
        y1: ref.boundingBox[3],
      }))[0];
      setBoundingBox(newBoundingBox);

      jumpToPage(reference.pageNumber - 1);
      // if (viewerRef.current && pdfPage !== undefined) {
      //   viewerRef.current.jumpToPage(pdfPage - 1); // jumpToPage uses 0-based index
      // }
    }
  }, [isPdfLoaded, reference]);

  useEffect(() => {
    setBoundingBox(null);
  }, [fileData]);

  // const boundingBoxes = [
  //   {
  //     pageIndex: 1, // 0-based index
  //     x0: 50.11199951171875,
  //     y0: 71.23847961425781,
  //     x1: 286.3651428222656,
  //     y1: 327.4231262207031,
  //   },
  // ];

  const renderHighlights = (props: RenderHighlightsProps) => {
    const pageWidth = 605; // 530
    const pageHeight = 790; // 750

    return (
      <div>
        {boundingBox &&
          [boundingBox]
            .filter((box) => box.pageIndex === props.pageIndex)
            .map((box, idx) => {
              // Convert absolute coordinates to percentages
              const left = (box.x0 / pageWidth) * 100;
              const top = (box.y0 / pageHeight) * 100;
              const width = ((box.x1 - box.x0) / pageWidth) * 100;
              const height = ((box.y1 - box.y0) / pageHeight) * 100;

              return (
                <div
                  key={idx}
                  className="highlight-area"
                  style={{
                    position: "absolute",
                    background: "rgba(0, 0, 255, 0.2)",
                    left: `${left}%`,
                    top: `${top}%`,
                    width: `${width}%`,
                    height: `${height}%`,
                  }}
                />
              );
            })}
      </div>
    );
  };

  const highlightPluginInstance = highlightPlugin({
    renderHighlights,
    trigger: Trigger.None,
  });

  return (
    // {(props: RenderCurrentPageLabelProps) => (
    //             <span>{`${props.currentPage + 1} of ${props.numberOfPages}`}</span>
    //         )}
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div style={{ width: "100%", height: "100%" }} className="overflow-auto">
        <Viewer
          ref={viewerRef}
          key={fileData.data?.signedUrl}
          fileUrl={fileData.data?.signedUrl}
          defaultScale={SpecialZoomLevel.PageWidth} //PageFit, PageWidth, PageHeight, ActualSize
          //   renderLoader={(percentages: number) => (
          //     <div style={{ width: "240px" }}>
          //       <ProgressBar progress={Math.round(percentages)} />
          //     </div>
          //   )}
          onDocumentLoad={() => setIsPdfLoaded(true)}
          plugins={[highlightPluginInstance, pageNavigationPluginInstance]}
        />
      </div>
    </Worker>
  );
};

export default PDFViewer;
