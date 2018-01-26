from PIL import Image
from PIL import ImageEnhance as ie
import numpy as np


def getImageFolder():
    directories = [x[1] for x in os.walk(path)]
    non_empty_dirs = [x for x in directories if x]  # filter out empty lists
    s2_directories = non_empty_dirs[0]
    for s2 in s2_directories:
        outputPathBaseList.append(outputPathBase + s2)
        os.makedirs(outputPathBase + s2)
    imgFolderList = []
    for folder in s2_directories:
        directorieList = path + '/' + folder + "/GRANULE"
        imgFolder = directorieList + '/' + [x[1] for x in os.walk(directorieList)][0][0] + '/' + 'IMG_DATA'
        imgFolderList.append(imgFolder)
        return imgFolderList

#open image
im=image.open(path)

#get value of brightness from User
parser = argparse.ArgumentParser(description='Creates a RGB images with three Bands.')
parser.add_argument('value',
                    help='value of brightness')

value=parser.parse_args().value

#coordinates of the pixel
X,Y = 0,0
#Get RGB
pixelRGB = im.getpixel((X,Y))
R,G,B = pixelRGB
#calculate brightness
LuminanceA = (0.299*R) + (0.587*G) + (0.114*B)

#calculate factor of change
if LuminanceA>0:
    factor= value/LuminanceA
else:
    factor=value/(LuminanceA+1)

brightness = ie.Brightness(im)
Image_with_changed_brightness=brightness.enhance(factor)

def change_brightness(im, factor):
    brightness = ie.Brightness(im)
    brightness.enhance(factor)
    Image_with_changed_brightness=brightness.enhance(factor)
    return  Image_with_changed_brightness.show()

if value<255:
    change_brightness(im, factor)
else:
    h,w,bpp  = np.shape(im) # get image properties.
    width=str(w)
    height=str(h)
    Image_with_changed_brightness = Image.new("RGB", ((w), (h)), "white") #create image with value of brightness of 255


