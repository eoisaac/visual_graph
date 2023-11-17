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
  matrix?: number[][]
}

export const getGraphMatrix = async (file: File): Promise<ValidationResult> => {
  const content = await readFileContent(file)

  const lines = content.split('\n').filter((line) => line !== '')

  const matrix = lines.map((line) => {
    const formattedLine = line.replace(';', '').split(' ')
    return formattedLine.map((value) => parseInt(value))
  })

  console.log(matrix)
  const isValid = matrix.every(
    (row) =>
      row.length === matrix.length && row.every((value) => !isNaN(value)),
  )

  if (!isValid) {
    return {
      isValid: false,
      message: 'The matrix is invalid.',
    }
  }

  return {
    isValid: true,
    message: 'The matrix is valid.',
    matrix,
  }
}
