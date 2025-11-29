import { twMerge } from 'tailwind-merge'

export type BrandLogoProps = {
  logo?: boolean
  logoStyle?: string
  textStyle: string
}

export function BrandLogo({ logo, logoStyle, textStyle }: BrandLogoProps) {
  return (
    <div className="flex gap-4">
      {logo && <img src={'/banners/homeImage.png'} className={logoStyle} />}
      <p
        className={twMerge(
          `font-extrabold bg-gradient-to-r from-[#240726] via-[#34106b] to-[#2a0f38]
 
           bg-clip-text text-transparent drop-shadow-lg`,
          textStyle,
        )}
      >
        Meta Vault
      </p>
    </div>
  )
}
