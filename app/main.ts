import { platformBrowser } from '@angular/platform-browser';

import { AppModule } from '../aot/app/app.module.ngfactory';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
