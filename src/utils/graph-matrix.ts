import { Matrix } from '@/@types/app'

const readFileContent = async (file: File): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate delay
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      event.target
        ? resolve(event.target.result as string)
        : reject(new Error('Failed to read file content.'))
    }

    reader.readAsText(file)
  })
}

interface ValidationResult {
  isValid: boolean
  message: string
  matrix: Matrix | null
}

export const getGraphMatrix = async (file: File): Promise<ValidationResult> => {
  const content = await readFileContent(file)

  const lines = content.split('\n').filter((line) => line !== '')

  const matrix = lines.map((line) => {
    const formattedLine = line.replace(';', '').split(' ')
    return formattedLine.map((value) => parseInt(value))
  })

  const isValid = matrix.every(
    (row) =>
      row.length === matrix.length && row.every((value) => !isNaN(value)),
  )

  console.log('Matrix:', matrix)
  return {
    isValid,
    message: isValid ? 'The matrix is valid.' : 'Invalid matrix.',
    matrix: isValid ? matrix : null,
  }
}
