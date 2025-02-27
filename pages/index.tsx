import Head from 'next/head'

import { Stimulsoft } from 'stimulsoft-reports-js/Scripts/stimulsoft.blockly.editor'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    const options = new Stimulsoft.Viewer.StiViewerOptions()
    options.toolbar.showOpenButton = false
    options.toolbar.showAboutButton = false
    options.toolbar.showFullScreenButton = false
    options.toolbar.printDestination =
      Stimulsoft.Viewer.StiPrintDestination.Direct
    options.toolbar.viewMode = Stimulsoft.Viewer.StiWebViewMode.MultiplePages

    const viewer = new Stimulsoft.Viewer.StiViewer(options, 'StiViewer', false)
    const report = new Stimulsoft.Report.StiReport()

    report.loadFile('template-compy.mrt')
    viewer.report = report

    const dataSet = new Stimulsoft.System.Data.DataSet()
    dataSet.readJsonFile('data-mock-separate.json')
    viewer.report.regData(dataSet.dataSetName, dataSet.dataSetName, dataSet)
    viewer.report.dictionary.synchronize()

    viewer.renderHtml('viewer')
  }, [])
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div id='viewer' />
    </>
  )
}
