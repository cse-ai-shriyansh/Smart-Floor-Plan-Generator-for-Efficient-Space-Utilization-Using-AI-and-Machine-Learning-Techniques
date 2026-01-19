import { useState, FormEvent, ChangeEvent } from 'react';
import Head from 'next/head';
import styles from '@/styles/App.module.css';

interface FormData {
  plotWidth: string;
  plotHeight: string;
  numRooms: string;
  bedrooms: string;
  bathrooms: string;
  kitchen: boolean;
  livingRoom: boolean;
  diningRoom: boolean;
  studyRoom: boolean;
}

export default function App() {
  const [formData, setFormData] = useState<FormData>({
    plotWidth: '',
    plotHeight: '',
    numRooms: '',
    bedrooms: '',
    bathrooms: '',
    kitchen: true,
    livingRoom: true,
    diningRoom: false,
    studyRoom: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [floorPlan, setFloorPlan] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Plot Width validation
    if (!formData.plotWidth) {
      newErrors.plotWidth = 'Plot width is required';
    } else if (parseFloat(formData.plotWidth) <= 0) {
      newErrors.plotWidth = 'Plot width must be greater than 0';
    }

    // Plot Height validation
    if (!formData.plotHeight) {
      newErrors.plotHeight = 'Plot height is required';
    } else if (parseFloat(formData.plotHeight) <= 0) {
      newErrors.plotHeight = 'Plot height must be greater than 0';
    }

    // Number of Rooms validation
    if (!formData.numRooms) {
      newErrors.numRooms = 'Number of rooms is required';
    } else if (parseInt(formData.numRooms) < 1 || parseInt(formData.numRooms) > 10) {
      newErrors.numRooms = 'Number of rooms must be between 1 and 10';
    }

    // Bedrooms validation
    if (!formData.bedrooms) {
      newErrors.bedrooms = 'Number of bedrooms is required';
    } else if (parseInt(formData.bedrooms) < 0) {
      newErrors.bedrooms = 'Number of bedrooms cannot be negative';
    }

    // Bathrooms validation
    if (!formData.bathrooms) {
      newErrors.bathrooms = 'Number of bathrooms is required';
    } else if (parseInt(formData.bathrooms) < 1) {
      newErrors.bathrooms = 'At least one bathroom is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerate = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setGenerationError('');
    setFloorPlan(null);

    try {
      // Simulate API call to generate floor plan
      // const response = await fetch('/api/generate-floorplan', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // Simulate generation delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Simulate successful generation
      // In production, this would be the actual floor plan image URL
      setFloorPlan('/placeholder-floor-plan.png');
      
    } catch (error) {
      setGenerationError('Failed to generate floor plan. Please check your inputs and try again.');
      console.error('Generation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      plotWidth: '',
      plotHeight: '',
      numRooms: '',
      bedrooms: '',
      bathrooms: '',
      kitchen: true,
      livingRoom: true,
      diningRoom: false,
      studyRoom: false,
    });
    setErrors({});
    setFloorPlan(null);
    setGenerationError('');
  };

  const handleDownload = () => {
    // In production, this would download the actual floor plan
    alert('Download functionality will be implemented with backend integration');
  };

  return (
    <>
      <Head>
        <title>Generate Floor Plan | Smart Floor Plan Generator</title>
        <meta name="description" content="Generate your AI-powered floor plan" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Generate Floor Plan</h1>
          <p className={styles.subtitle}>Enter your requirements to create an optimized floor plan</p>
        </div>

        <div className={styles.mainContent}>
          {/* Left Panel - Input Form */}
          <div className={styles.leftPanel}>
            <h2 className={styles.panelTitle}>Input Parameters</h2>
            
            <form onSubmit={handleGenerate}>
              {/* Plot Dimensions */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Plot Dimensions (meters)</label>
                <div className={styles.inputGroup}>
                  <div>
                    <input
                      type="number"
                      name="plotWidth"
                      className={styles.input}
                      placeholder="Width"
                      value={formData.plotWidth}
                      onChange={handleChange}
                      step="0.1"
                      min="0"
                    />
                    {errors.plotWidth && (
                      <div className={styles.errorMessage}>{errors.plotWidth}</div>
                    )}
                  </div>
                  <div>
                    <input
                      type="number"
                      name="plotHeight"
                      className={styles.input}
                      placeholder="Height"
                      value={formData.plotHeight}
                      onChange={handleChange}
                      step="0.1"
                      min="0"
                    />
                    {errors.plotHeight && (
                      <div className={styles.errorMessage}>{errors.plotHeight}</div>
                    )}
                  </div>
                </div>
                <p className={styles.helpText}>Enter width and height of your plot</p>
              </div>

              {/* Number of Rooms */}
              <div className={styles.formGroup}>
                <label htmlFor="numRooms" className={styles.label}>
                  Total Number of Rooms
                </label>
                <input
                  type="number"
                  id="numRooms"
                  name="numRooms"
                  className={styles.input}
                  placeholder="e.g., 5"
                  value={formData.numRooms}
                  onChange={handleChange}
                  min="1"
                  max="10"
                />
                {errors.numRooms && (
                  <div className={styles.errorMessage}>{errors.numRooms}</div>
                )}
                <p className={styles.helpText}>Select between 1-10 rooms</p>
              </div>

              {/* Room Specifications */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Room Specifications</label>
                <div className={styles.inputGroup}>
                  <div>
                    <input
                      type="number"
                      name="bedrooms"
                      className={styles.input}
                      placeholder="Bedrooms"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      min="0"
                    />
                    {errors.bedrooms && (
                      <div className={styles.errorMessage}>{errors.bedrooms}</div>
                    )}
                  </div>
                  <div>
                    <input
                      type="number"
                      name="bathrooms"
                      className={styles.input}
                      placeholder="Bathrooms"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      min="1"
                    />
                    {errors.bathrooms && (
                      <div className={styles.errorMessage}>{errors.bathrooms}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Room Preferences */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Additional Rooms</label>
                <div className={styles.roomPreferences}>
                  <div className={styles.checkboxGroup}>
                    <input
                      type="checkbox"
                      id="kitchen"
                      name="kitchen"
                      className={styles.checkbox}
                      checked={formData.kitchen}
                      onChange={handleChange}
                    />
                    <label htmlFor="kitchen" className={styles.checkboxLabel}>
                      Kitchen
                    </label>
                  </div>
                  <div className={styles.checkboxGroup}>
                    <input
                      type="checkbox"
                      id="livingRoom"
                      name="livingRoom"
                      className={styles.checkbox}
                      checked={formData.livingRoom}
                      onChange={handleChange}
                    />
                    <label htmlFor="livingRoom" className={styles.checkboxLabel}>
                      Living Room
                    </label>
                  </div>
                  <div className={styles.checkboxGroup}>
                    <input
                      type="checkbox"
                      id="diningRoom"
                      name="diningRoom"
                      className={styles.checkbox}
                      checked={formData.diningRoom}
                      onChange={handleChange}
                    />
                    <label htmlFor="diningRoom" className={styles.checkboxLabel}>
                      Dining Room
                    </label>
                  </div>
                  <div className={styles.checkboxGroup}>
                    <input
                      type="checkbox"
                      id="studyRoom"
                      name="studyRoom"
                      className={styles.checkbox}
                      checked={formData.studyRoom}
                      onChange={handleChange}
                    />
                    <label htmlFor="studyRoom" className={styles.checkboxLabel}>
                      Study Room
                    </label>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className={styles.buttonGroup}>
                <button
                  type="submit"
                  className={styles.generateButton}
                  disabled={isLoading}
                >
                  {isLoading ? 'Generating...' : 'Generate Floor Plan'}
                </button>
                <button
                  type="button"
                  className={styles.resetButton}
                  onClick={handleReset}
                  disabled={isLoading}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Right Panel - Preview */}
          <div className={styles.rightPanel}>
            <h2 className={styles.previewTitle}>Floor Plan Preview</h2>
            
            <div className={styles.previewContent}>
              {!isLoading && !floorPlan && !generationError && (
                <div className={styles.placeholder}>
                  <div className={styles.placeholderIcon}>▦</div>
                  <p className={styles.placeholderText}>
                    Your floor plan will appear here
                  </p>
                </div>
              )}

              {isLoading && (
                <div className={styles.loading}>
                  <div className={styles.loadingSpinner}></div>
                  <p className={styles.loadingText}>Generating Floor Plan</p>
                  <p className={styles.loadingSubtext}>
                    AI is optimizing your space layout...
                  </p>
                </div>
              )}

              {generationError && (
                <div className={styles.errorMessage}>{generationError}</div>
              )}

              {floorPlan && (
                <div style={{ width: '100%', textAlign: 'center' }}>
                  {/* Placeholder for actual floor plan */}
                  <div style={{
                    width: '100%',
                    minHeight: '400px',
                    border: '2px solid black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white'
                  }}>
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                      <div style={{ fontSize: '4rem', marginBottom: '20px' }}>▦</div>
                      <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                        Floor Plan Generated Successfully
                      </p>
                      <p style={{ fontSize: '0.95rem', opacity: 0.7, marginTop: '10px' }}>
                        {formData.plotWidth}m × {formData.plotHeight}m | {formData.numRooms} Rooms
                      </p>
                      <p style={{ fontSize: '0.9rem', opacity: 0.6, marginTop: '20px' }}>
                        (Backend integration required to display actual floor plan)
                      </p>
                    </div>
                  </div>
                  <button
                    className={styles.downloadButton}
                    onClick={handleDownload}
                  >
                    Download Floor Plan
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
