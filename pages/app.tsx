import { useState, FormEvent, ChangeEvent } from 'react';
import Head from 'next/head';
import styles from '@/styles/App.module.css';

interface FormData {
  length: string;
  width: string;
  bedrooms: string;
  drawingRoom: string;
  kitchen: string;
  toilet: string;
  hasParking: boolean;
  parkingLength: string;
  parkingWidth: string;
  parkingDepth: string;
  hasPorch: boolean;
  porch: string;
  hasVeranda: boolean;
  veranda: string;
}

export default function App() {
  const [formData, setFormData] = useState<FormData>({
    length: '',
    width: '',
    bedrooms: '',
    drawingRoom: '',
    kitchen: '',
    toilet: '',
    hasParking: false,
    parkingLength: '',
    parkingWidth: '',
    parkingDepth: '',
    hasPorch: false,
    porch: '',
    hasVeranda: false,
    veranda: '',
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

    // Length validation
    if (!formData.length) {
      newErrors.length = 'Length is required';
    } else if (parseFloat(formData.length) <= 0) {
      newErrors.length = 'Length must be greater than 0';
    }

    // Width validation
    if (!formData.width) {
      newErrors.width = 'Width is required';
    } else if (parseFloat(formData.width) <= 0) {
      newErrors.width = 'Width must be greater than 0';
    }

    // Bedrooms validation
    if (!formData.bedrooms) {
      newErrors.bedrooms = 'Number of bedrooms is required';
    } else if (parseInt(formData.bedrooms) < 0) {
      newErrors.bedrooms = 'Number of bedrooms cannot be negative';
    }

    // Drawing room validation
    if (!formData.drawingRoom) {
      newErrors.drawingRoom = 'Number of drawing rooms is required';
    } else if (parseInt(formData.drawingRoom) < 0) {
      newErrors.drawingRoom = 'Number of drawing rooms cannot be negative';
    }

    // Kitchen validation
    if (!formData.kitchen) {
      newErrors.kitchen = 'Number of kitchens is required';
    } else if (parseInt(formData.kitchen) < 0) {
      newErrors.kitchen = 'Number of kitchens cannot be negative';
    }

    // Toilet validation
    if (!formData.toilet) {
      newErrors.toilet = 'Number of toilets is required';
    } else if (parseInt(formData.toilet) < 1) {
      newErrors.toilet = 'At least one toilet is required';
    }

    // Parking validation (if enabled)
    if (formData.hasParking) {
      if (!formData.parkingLength || parseFloat(formData.parkingLength) <= 0) {
        newErrors.parkingLength = 'Parking length must be greater than 0';
      }
      if (!formData.parkingWidth || parseFloat(formData.parkingWidth) <= 0) {
        newErrors.parkingWidth = 'Parking width must be greater than 0';
      }
      if (!formData.parkingDepth || parseFloat(formData.parkingDepth) <= 0) {
        newErrors.parkingDepth = 'Parking depth must be greater than 0';
      }
    }

    // Porch validation (if enabled)
    if (formData.hasPorch) {
      if (!formData.porch || parseInt(formData.porch) < 1) {
        newErrors.porch = 'Number of porches must be at least 1';
      }
    }

    // Veranda validation (if enabled)
    if (formData.hasVeranda) {
      if (!formData.veranda || parseInt(formData.veranda) < 1) {
        newErrors.veranda = 'Number of verandas must be at least 1';
      }
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
      length: '',
      width: '',
      bedrooms: '',
      drawingRoom: '',
      kitchen: '',
      toilet: '',
      hasParking: false,
      parkingLength: '',
      parkingWidth: '',
      parkingDepth: '',
      hasPorch: false,
      porch: '',
      hasVeranda: false,
      veranda: '',
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
                <label className={styles.label}>Plot Dimensions (feet)</label>
                <div className={styles.inputGroup}>
                  <div>
                    <input
                      type="number"
                      name="length"
                      className={styles.input}
                      placeholder="Length"
                      value={formData.length}
                      onChange={handleChange}
                      step="0.1"
                      min="0"
                    />
                    {errors.length && (
                      <div className={styles.errorMessage}>{errors.length}</div>
                    )}
                  </div>
                  <div>
                    <input
                      type="number"
                      name="width"
                      className={styles.input}
                      placeholder="Width"
                      value={formData.width}
                      onChange={handleChange}
                      step="0.1"
                      min="0"
                    />
                    {errors.width && (
                      <div className={styles.errorMessage}>{errors.width}</div>
                    )}
                  </div>
                </div>
                <p className={styles.helpText}>Enter length and width of your plot in feet</p>
              </div>

              {/* Room Specifications */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Number of Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  className={styles.input}
                  placeholder="e.g., 3"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  min="0"
                />
                {errors.bedrooms && (
                  <div className={styles.errorMessage}>{errors.bedrooms}</div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Number of Drawing Room / Living Room</label>
                <input
                  type="number"
                  name="drawingRoom"
                  className={styles.input}
                  placeholder="e.g., 1"
                  value={formData.drawingRoom}
                  onChange={handleChange}
                  min="0"
                />
                {errors.drawingRoom && (
                  <div className={styles.errorMessage}>{errors.drawingRoom}</div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Number of Kitchen</label>
                <input
                  type="number"
                  name="kitchen"
                  className={styles.input}
                  placeholder="e.g., 1"
                  value={formData.kitchen}
                  onChange={handleChange}
                  min="0"
                />
                {errors.kitchen && (
                  <div className={styles.errorMessage}>{errors.kitchen}</div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Number of Toilet</label>
                <input
                  type="number"
                  name="toilet"
                  className={styles.input}
                  placeholder="e.g., 2"
                  value={formData.toilet}
                  onChange={handleChange}
                  min="1"
                />
                {errors.toilet && (
                  <div className={styles.errorMessage}>{errors.toilet}</div>
                )}
              </div>

              {/* Parking Space (Optional) */}
              <div className={styles.formGroup}>
                <div className={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id="hasParking"
                    name="hasParking"
                    className={styles.checkbox}
                    checked={formData.hasParking}
                    onChange={handleChange}
                  />
                  <label htmlFor="hasParking" className={styles.checkboxLabel}>
                    Include Parking Space
                  </label>
                </div>
                
                {formData.hasParking && (
                  <div className={styles.inputGroup} style={{ marginTop: '15px' }}>
                    <div>
                      <input
                        type="number"
                        name="parkingLength"
                        className={styles.input}
                        placeholder="Length (ft)"
                        value={formData.parkingLength}
                        onChange={handleChange}
                        step="0.1"
                        min="0"
                      />
                      {errors.parkingLength && (
                        <div className={styles.errorMessage}>{errors.parkingLength}</div>
                      )}
                    </div>
                    <div>
                      <input
                        type="number"
                        name="parkingWidth"
                        className={styles.input}
                        placeholder="Width (ft)"
                        value={formData.parkingWidth}
                        onChange={handleChange}
                        step="0.1"
                        min="0"
                      />
                      {errors.parkingWidth && (
                        <div className={styles.errorMessage}>{errors.parkingWidth}</div>
                      )}
                    </div>
                    <div>
                      <input
                        type="number"
                        name="parkingDepth"
                        className={styles.input}
                        placeholder="Depth (ft)"
                        value={formData.parkingDepth}
                        onChange={handleChange}
                        step="0.1"
                        min="0"
                      />
                      {errors.parkingDepth && (
                        <div className={styles.errorMessage}>{errors.parkingDepth}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Porch (Optional) */}
              <div className={styles.formGroup}>
                <div className={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id="hasPorch"
                    name="hasPorch"
                    className={styles.checkbox}
                    checked={formData.hasPorch}
                    onChange={handleChange}
                  />
                  <label htmlFor="hasPorch" className={styles.checkboxLabel}>
                    Include Porch
                  </label>
                </div>
                
                {formData.hasPorch && (
                  <div style={{ marginTop: '15px' }}>
                    <input
                      type="number"
                      name="porch"
                      className={styles.input}
                      placeholder="Number of Porches"
                      value={formData.porch}
                      onChange={handleChange}
                      min="1"
                    />
                    {errors.porch && (
                      <div className={styles.errorMessage}>{errors.porch}</div>
                    )}
                  </div>
                )}
              </div>

              {/* Veranda (Optional) */}
              <div className={styles.formGroup}>
                <div className={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id="hasVeranda"
                    name="hasVeranda"
                    className={styles.checkbox}
                    checked={formData.hasVeranda}
                    onChange={handleChange}
                  />
                  <label htmlFor="hasVeranda" className={styles.checkboxLabel}>
                    Include Veranda
                  </label>
                </div>
                
                {formData.hasVeranda && (
                  <div style={{ marginTop: '15px' }}>
                    <input
                      type="number"
                      name="veranda"
                      className={styles.input}
                      placeholder="Number of Verandas"
                      value={formData.veranda}
                      onChange={handleChange}
                      min="1"
                    />
                    {errors.veranda && (
                      <div className={styles.errorMessage}>{errors.veranda}</div>
                    )}
                  </div>
                )}
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
                        {formData.length}ft × {formData.width}ft | {formData.bedrooms} Bedrooms
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
