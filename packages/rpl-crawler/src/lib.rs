mod has_rpl_update;

use neon::prelude::*;
use chrono::NaiveDate;
use once_cell::sync::OnceCell;
use tokio::runtime::Runtime;

// Return a global tokio runtime or create one if it doesn't exist.
// Throws a JavaScript exception if the `Runtime` fails to create.
fn runtime<'a, C: Context<'a>>(cx: &mut C) -> NeonResult<&'static Runtime> {
    static RUNTIME: OnceCell<Runtime> = OnceCell::new();

    RUNTIME.get_or_try_init(|| Runtime::new().or_else(|err| cx.throw_error(err.to_string())))
}

fn has_rpl_update_wrapper(mut cx: FunctionContext) -> JsResult<JsPromise> {
    let rt = runtime(&mut cx)?;
    let channel = cx.channel();
    let date_as_string = cx.argument::<JsString>(0)?.value(&mut cx);

    let (deferred, promise) = cx.promise();
    
    rt.spawn(async move {
        let date = NaiveDate::parse_from_str(date_as_string.as_str(), "%Y-%m-%d").unwrap();
        let has_rpl_update = has_rpl_update::has_rpl_update(date).await;

        deferred.settle_with(&channel, move |mut cx| {
            match has_rpl_update {
                Ok(response) => Ok(cx.boolean(response)),
                Err(error) => cx.throw_error(error)
            }
        });
    });

    // Return the promise back to JavaScript
    Ok(promise)
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("hasRplUpdate", has_rpl_update_wrapper)?;

    Ok(())
}