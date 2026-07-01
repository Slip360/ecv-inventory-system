use tauri::Manager;

mod commands;
mod database;
mod dtos;
mod entities;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let app_handle = app.handle().clone();
            tauri::async_runtime::block_on(async move {
                let app_data_path = app_handle.path().app_data_dir().unwrap();
                let db_connection = database::init::init_db(app_data_path).await;
                app_handle.manage(database::init::DbState(db_connection));
            });
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            commands::product_commad::create_product,
            commands::product_commad::get_products,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
