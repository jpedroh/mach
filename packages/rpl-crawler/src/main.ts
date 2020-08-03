import updateChecker from "./update-checker"
import Logger from "./utils/logger"

const main = async (args: string[]) => {
    try {
        const firs = args[2].split(',')
        const date = args[3]

        Logger.info(`CHECKING IF EXISTS UPDATES FOR ${date}`)
        const hasUpdate = await updateChecker(date);
        if (!hasUpdate) {
            Logger.info(`NO UPDATES FOUND FOR ${date}`);
            process.exit(0);
        }

        Logger.info(`STARTING RPL UPDATE FOR ${date}`)

        Logger.info(`STARTING RPL FILES DOWNLOAD`)
        for (const fir of firs) {
            Logger.info(`DOWNLOADING RPL FILE FOR ${fir}`)
        }
        Logger.info(`COMPLETED RPL FILES DOWNLOAD`)

        Logger.info(`STARTING LINES EXTRACTION FROM RPL FILES`)
        for (const fir of firs) {
            Logger.info(`EXTRACTING LINES FROM RPL FILE FOR ${fir}`)
        }
        Logger.info(`COMPLETED LINES EXTRACTION FROM RPL FILES`)

        Logger.info(`STARTING DECODING OF RPL FILES DATA`)
        Logger.info(`COMPLETED DECODING OF RPL FILES DATA`)

        Logger.info(`STARTING SAVING DECODED DATA TO DATABASE`)
        Logger.info(`COMPLETED SAVING DECODED DATA TO DATABASE`)

        Logger.info(`COMPLETED RPL UPDATE FOR ${date}`)
    } catch (error) {
        Logger.error(error.message)
        process.exit(1)
    }
}

main(process.argv);
