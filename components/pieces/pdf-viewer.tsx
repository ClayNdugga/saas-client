import { ApiResponse } from "@/models/api";
import { Viewer, SpecialZoomLevel, ProgressBar, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import { highlightPlugin, Trigger } from "@react-pdf-viewer/highlight";
import type { HighlightArea, RenderHighlightsProps } from "@react-pdf-viewer/highlight";

import React, { useState } from "react";

interface Props {
  fileData: ApiResponse<{ signedUrl: string }>;
}

const PDFViewer = ({ fileData }: Props) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [
      defaultTabs[0], // Thumbnails tab
    ],
  });

  //   const areas = [
  //     {
  //       pageIndex: 3,
  //       height: 1.55401,
  //       width: 28.1674,
  //       left: 27.5399,
  //       top: 15.0772,
  //     },
  //     {
  //       pageIndex: 3,
  //       height: 1.32637,
  //       width: 37.477,
  //       left: 55.7062,
  //       top: 15.2715,
  //     },
  //     {
  //       pageIndex: 3,
  //       height: 1.55401,
  //       width: 28.7437,
  //       left: 16.3638,
  //       top: 16.6616,
  //     },
  //   ];

  //   const renderHighlights = (props: RenderHighlightsProps) => (
  //     <div>
  //       {areas
  //         .filter((area) => area.pageIndex === props.pageIndex)
  //         .map((area, idx) => (
  //           <div
  //             key={idx}
  //             className="highlight-area"
  //             style={Object.assign(
  //               {},
  //               {
  //                 background: "blue",
  //                 opacity: 0.4,
  //               },
  //               // Calculate the position
  //               // to make the highlight area displayed at the desired position
  //               // when users zoom or rotate the document
  //               props.getCssProperties(area, props.rotation)
  //             )}
  //           />
  //         ))}
  //     </div>
  //   );

  const boundingBoxes = [
    {
      pageIndex: 1, // 0-based index
      x0: 50.11199951171875,
      y0: 71.23847961425781,
      x1: 286.3651428222656,
      y1: 327.4231262207031,
    },
  ];

  const renderHighlights = (props: RenderHighlightsProps) => {
    const pageWidth = 530;
    // const pageWidth = props.getPageWidth();
    const pageHeight = 750; // Fixed height

    return (
      <div>
        {boundingBoxes
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
                  background: "rgba(0, 0, 255, 0.4)",
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
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div style={{ height: "750px", width: "100%" }}>
        <Viewer
          fileUrl={fileData.data?.signedUrl}
          defaultScale={SpecialZoomLevel.PageWidth} //PageFit, PageWidth, PageHeight, ActualSize
        //   renderLoader={(percentages: number) => (
        //     <div style={{ width: "240px" }}>
        //       <ProgressBar progress={Math.round(percentages)} />
        //     </div>
        //   )}
          plugins={[highlightPluginInstance]}
        />
      </div>
    </Worker>
  );
};

export default PDFViewer;
