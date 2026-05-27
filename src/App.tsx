import { twMerge } from 'tailwind-merge'
import { PLUGIN_UI_WIDTH } from '@/consts/pluginUiSize'
import { Converter } from '@/features/Converter/Converter'
import { SCROLLBAR_CLASS } from '@/features/Converter/consts/glassPanelStyles'

export const App = () => {
  const mainClass = twMerge(
    'app-background text-foreground',
    SCROLLBAR_CLASS,
    'flex min-h-screen w-full justify-center p-3',
  )

  return (
    <main className={mainClass}>
      <div className="w-full" style={{ maxWidth: PLUGIN_UI_WIDTH }}>
        <Converter />
      </div>
    </main>
  )
}
